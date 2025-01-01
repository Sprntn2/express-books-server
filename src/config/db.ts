import mongoose from "mongoose";

const urlTest = process.env.MONGO_URL
console.log(".env mongoUrl test:", urlTest);

//const mongourl = "mongodb+srv://shapiranatan:1q2w3e4r@cluster0.yfteoyc.mongodb.net/"
const mongourl = "mongodb+srv://shapiranatan:1q2w3e4r@cluster0.yfteoyc.mongodb.net/booksDB?retryWrites=true&w=majority&appName=Cluster0"
const MONGO_URL = process.env.MONGO_URL || mongourl
//console.log(MONGO_URL);


// export function connect(){
//     try {
//         mongoose.connect(MONGO_URL).then(() => console.log("DB connected"))
//     } catch (error) {
//         //console.log(`DB error: ${error}`)
//         console.log("connection failed")
//     }
// }

export const connect = async () => {
    try {
      const conn = await mongoose.connect(MONGO_URL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};
