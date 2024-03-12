import mongoose from 'mongoose';
//MongooseURI taken from mongoDB compass
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook'; // Replace with your actual MongoDB URL

const connectToMongo = async () => {
  try {
    await mongoose
    .connect(mongoURI);                 // Connecting to MongoDB server
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    handleError(error);
  }
};

export default connectToMongo;





// const mongoose = require('mongoose');
// import mongoose from "mongoose";
// const mongoURI = "mongodb://mongodb://localhost:27017/inotebook";


// mongoose
//   .connect(mongoURI)
//   .then(()=>{
//     console.log("Database is connected successfully...");
// })
//   .catch((error) => {
//     console.log(error);
//   })

// export default connetToMongo;

// const connectToMongo = async () => {
//   try {
//     await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log("Connected to MongoDB successfully");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// };

// module.exports = connectToMongo;





// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/"

// const connectToMongo = async () => {
// try {
//     mongoose.set('strictQuery', false)
//     mongoose.connect(mongoURI) 
//     console.log('Mongo connected')
// }
// catch(error) {
//     console.log(error)
//     process.exit()
// }
// }
// module.exports = connectToMongo;




// const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017/'; // Replace with your actual MongoDB URL

// const connectToMongo = async () => {
//   try {
//     await mongoose.connect(mongoURI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB!');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit the process on connection failure
//   }
// };

// module.exports = connectToMongo;

// import mongoose from 'mongoose';

// const mongoURI = 'mongodb://localhost:27017/'; // Replace with your actual MongoDB URL

// const connectToMongo = async () => {
//   try {
//     await mongoose.connect(mongoURI);
//     console.log('Connected to MongoDB!');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1); // Exit the process on connection failure
//   }
// };

// export default connectToMongo;



