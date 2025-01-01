import { FilterQuery, UpdateQuery, UpdateWriteOpResult } from "mongoose";
import IUser from "../interfaces/IUser";
import userModel from "../models/user.model";
import IBookRequest from "../dto/BookRequest";
import { ObjectId } from "mongodb"
import { console } from "inspector";
import IBook from "../interfaces/IBook";


export default class UserController{

    //for now the db is locally so the async is no needed

    static async create(user: Partial<IUser>): Promise<IUser>{
        const result = await userModel.create(user)
        return result
    }

    //static async readSelectOne(filter: FilterQuery<IUser> = {}, select: String = ""): Promise<Partial<IUser> | null>{
    static async readSelectOne(filter: FilterQuery<IUser> = {}, select: String = ""): Promise<IUser | null>{
        const result = await userModel.findOne(filter, select)
        return result
    }

    static async read(filter: FilterQuery<IUser> = {}): Promise<IUser[]>{
        //const user = Object.keys(select).length? await userModel.findOne(filter, select) : await userModel.findOne(filter)
        const users = await userModel.find(filter)
        return users
    }

    static async update(filter: FilterQuery<IUser>, data: UpdateQuery<IUser | IBook>):Promise<UpdateWriteOpResult>{
        console.log("user controller - update");
        
        return await userModel.updateOne(filter, data)
    }

    static async pushBook(bookRequest: IBookRequest){
        console.log("user controller - push book");
        
        const { bookId, bookName, imageSrc } = bookRequest
        const result = await userModel.updateOne({email: bookRequest.userEmail}, { $push: { books: { bookId, bookName, imageSrc }}})
        console.log("push book result:", result)
        return result
    }

    static async pushBook_v1(bookRequest:IBookRequest): Promise<ObjectId | undefined>{
        console.log("check bookRequest", bookRequest)
        const user = await userModel.findOne({email: bookRequest.userEmail})
        console.log("user check:", user);
        
        if (!user) return undefined
        const {bookId, bookName, imageSrc} = bookRequest
        console.log("check image source", imageSrc);
        
        user.books?.push({bookId, bookName, imageSrc})
        //console.log("user check 2", user);
        
        const objectId = user.books && user.books[user.books.length - 1]._id as ObjectId
        await user.save()

        return objectId
    }

    // static read()
    // static readOne()
    // static update()
    // static del()
}