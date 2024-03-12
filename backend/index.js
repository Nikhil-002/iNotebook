import connectToMongo from './db.js';
// const connectToMongo = require('./db.js')
import express from 'express';
import authRoutes from './routes/auth.js'
import notesRoutes from './routes/notes.js'
import cors from 'cors'
//Calling db.js function for connecting mongoDB
connectToMongo();
const app = express();
const port = 5000;
app.use(cors())

// Used for Reading the body of object {body.req}
app.use(express.json())

//Routes to auth.js , authRoutes --> route to take when this api will be called
app.use('/api/auth', authRoutes)

//Routes to notes.js
app.use('/api/notes', notesRoutes)


app.get('/', (req, res) => {
    res.send('Hello World ghuj');
});

app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});
