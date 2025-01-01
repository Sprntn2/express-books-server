import { Document } from "mongoose";

export default interface IBook extends Partial<Document>{
    bookId: string,
    bookName: string,
    imageSrc: string
}