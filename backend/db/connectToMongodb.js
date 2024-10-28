import mongoose from "mongoose";


// const connectDB = async () => mongoose.connect("mongodb://127.0.0.1:27017/NEW-CHATAPP").then((dbo)=>{
//     console.log("DB connected")
//   },(err)=>{
//     console.log("error")
//   });

const connectDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://taylor86941:kaxAhI0RSSyXMqp5@cluster0.8tlur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0P");
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection failed:', err.message);
      process.exit(1); // Exit process if connection fails
    }
  };


  export default connectDB;