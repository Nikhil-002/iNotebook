import express from 'express';
import User from '../models/User.js';
import bodyParser from 'body-parser'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fetchUser from '../middleware/fetchUser.js';

const JWT_SECRET = 'Nikkii'

// Router used for routing in the express
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }))

//POST request, Creating an User and checking validation of it and saving it to mongoose server

//ROUTE 1 ==> Create a user using: POST "api/auth/createuser". No Login required
router.post('/createuser', [
    body('username', 'Enter a valid username').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    let success = false;
    //if there are error written bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success,  error: "This email already exist.." })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass,
        })
        console.log("User created Successfully");
        const data = {
            user: {
                id: user._id
            }
        }
        var authToken = jwt.sign(data, JWT_SECRET);
        console.log(`auth-token created successfully of user-Id ${data.user.id}`);
        success = true
        res.json({success, authToken});

    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Internal Server Error');
    }
});

//ROUTE 2 ==> Authenticate a User using: POST "api/auth/login". No login required 
router.post('/login', [
    body('email').isEmail(),
    body('password').exists(),
], async (req, res) => {
    let success = false;
    //if there are error written bad req and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(`Email: ${req.body.email}, password: ${req.body.password}`);

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({success, errors: "Try to login with correct crendentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            return res.status(400).json({ success, errors: "Try to login with correct crendentials" });
        }
        const data = {
            user: {
                id: user._id
            }
        }
        console.log(`Token can be generated of email: ${req.body.email}`);

        var authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some Error Occured');
    }
})

//ROUTE 3 ==> Get loggedin user details using: POST "api/auth/getuser". Login required.
router.post('/getuser', fetchUser, async (req, res) => {

    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password") // show all details except password
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Some Error Occured');
    }
})

export default router;
