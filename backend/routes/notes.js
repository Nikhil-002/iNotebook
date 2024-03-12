import express from 'express';
import fetchUser from '../middleware/fetchUser.js';
import Note from '../models/Note.js'
import bodyParser from 'body-parser'
import { body, validationResult } from 'express-validator'

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }))

//ROUTE 1 ==> Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    const notes = await Note.find({ user: req.user.id })
    // console.log(notes);
    res.json(notes);
});

//ROUTE 2 ==> Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //if there are error written bad req and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let note = await Note.create({
            title: title,
            description: description,
            tag: tag,
            user: req.user.id
        })
        console.log("Note created Successfully");
        console.log(`Note created of user-id ${note.user}  and ${note._id}`);
        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 3 ==> Update an existing note using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const {title, description, tag} = req.body;

    try {
        //Create a new Note object
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
    
        //Fint the note to be updated and update it
        let note = await Note.findById(req.params.id)
        if(!note) {return res.status(404).json({error : "Not Found"})}
    
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Note Allowed")
        }
    
        note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new : true})
        res.json(note);
    }catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 4 ==> Delete an existing note using: DELETE "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        
        //Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id)
        if(!note) {return res.status(404).json({error : "Not Found"})}
    
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Note Allowed")
        }
    
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Sucess" : "Note has been deleted", note : note});
    }catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
