import mongoose from "mongoose";
import IUser from "../interfaces/IUser";
import IBook from "../interfaces/IBook";

const bookSchema = new mongoose.Schema<IBook>({
    bookId: {
        type: String,
        required: true,
        unique: true
    },
    bookName: {
        type: String,
        required: true,
    },
    imageSrc: {
        type: String,
        required: true,
        default: ""
    }
})

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        select: false
    },
    isActive: {
        type: Boolean,
        default : true
    },
    // books: [{
    //     bookId: {
    //         type: String,
    //         required: true,
    //         unique: true
    //     }
    // }]
    books: [bookSchema]
})

export default mongoose.model<IUser>('user', userSchema)