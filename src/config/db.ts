import mongoose from "mongoose";

// const urlTest = process.env.MONGO_URL
// console.log(".env mongoUrl test:", urlTest);


const MONGO_URL = process.env.MONGO_URL as string
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
