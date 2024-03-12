import mongoose from 'mongoose';
const { Schema } = mongoose;

//Making a schema for user like what are the field to be needed for User 
const UserSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    } 
});
const User = mongoose.model('User', UserSchema);    // to use this schema as a model in other files
User.createIndexes();                       // Create indexes for users and to avoid duplicate entries
export default User;