import { ObjectId } from "mongodb"
import IBook from "./IBook"
import { Document } from "mongoose"

//export default interface IUser{
export default interface IUser extends Partial<Document>{
//export default interface IUser extends Document{
    email: string
    fullName: string
    password?: string
    //permision: Permisions
    isActive:boolean
    //books: IBook[] | ObjectId[]
    books: IBook[]
    //_id?: ObjectId
}