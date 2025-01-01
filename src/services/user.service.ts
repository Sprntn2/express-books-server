import UserController from "../controllers/user.controller";
import RegisterRequest from "../dto/RegisterRequest";
import bcrypt from 'bcryptjs';
import IBookRequest from "../dto/BookRequest";

import { ObjectId } from "mongodb"
import IRemoveBook from "../dto/IRemoveBook";
import { promises } from "dns";
import IBook from "../interfaces/IBook";

export default class UserService{

    static saltRounds = 10;
    
    static async registerUser(user: RegisterRequest): Promise<boolean>{
        if(!user.isValid()) return false

        const {email, password, fullName} = user
        const hashedPassword = await bcrypt.hash(password, this.saltRounds)
        const dbUser = await UserController.create({email, fullName, password: hashedPassword})
        if(!dbUser) throw new Error("some error occurred")
        return true
    }

    static async removeBook(removeRequest: IRemoveBook): Promise<boolean>{
        console.log("userService - remove book")
        const user = await UserController.readSelectOne({email: removeRequest.email})
        if(!user) throw new Error('User not found');
        const {objectId} = removeRequest
        //if(user.books.some(b => b._id == objectId)) throw new Error('Book not exist in to user\'s books');
        const index = user.books.findIndex(b => b._id == objectId)
        if(!index)throw new Error('Book not exist in to user\'s books');
        user.books.splice(index, 1)
        if(user.save)await user.save()
        console.log("changes saved successfully")

        //test
        const user2 = await UserController.readSelectOne({email: removeRequest.email})
        console.log("user after removing:", user2)

        return true
    }

    static async getCart(email: string): Promise<IBook[]>{
        console.log("user service - get cart");

        const result = await UserController.readSelectOne({email}, "books")
        //console.log(result);
        if(!result) throw new Error('User or books not found');
        return result.books as IBook[]
        // return user.books;
        //return []
    }

    static async addBook(bookRequest:IBookRequest): Promise<ObjectId | undefined>{
        console.log("user service - add book");
        const user = await UserController.readSelectOne({email: bookRequest.userEmail})
        if(!user) throw new Error('User not found');
        //const userId = user._id;
        const { bookId, bookName, imageSrc } = bookRequest
        const result = await UserController.update({email: bookRequest.userEmail},  { $push: { books: { bookId, bookName, imageSrc }}})
        //console.log("add book result:", result);
        if(!result.modifiedCount) throw new Error("Changes not saved")
        console.log("user after add book", user)
        const _id = user._id;
        console.log("user _id:", _id)
        const userAfter = await UserController.readSelectOne({ _id })
        console.log("user after:", userAfter)
        if(!userAfter) throw new Error("Changes not saved");
        const objectId = userAfter.books[userAfter.books.length - 1]._id as ObjectId
        //const objectId = user.books && user.books[user.books.length - 1]._id as ObjectId
        return objectId
        
        /*
        v2
        const user = await UserController.readSelectOne({email: bookRequest.userEmail})
        if(!user) throw new Error('User not found');
        const result = await UserController.pushBook(bookRequest)
        console.log("add book result:", result);
        if(!result.modifiedCount) throw new Error("Changes not saved")
        
        const objectId = user.books && user.books[user.books.length - 1]._id as ObjectId
        return objectId
        */

        //return await UserController.pushBook(bookRequest)
        

        /*
        v1
        const user = await UserController.readSelectOne({email: bookRequest.userEmail})
        if(!user) throw new Error('User not found');
        const {bookId, bookName, imageSrc} = bookRequest
        if(user.books.some(b => b.bookId === bookId)) throw new Error('Book already added to user');
        user.books?.push({bookId, bookName, imageSrc})
        const objectId = user.books && user.books[user.books.length - 1]._id as ObjectId
        if(user.save)await user.save()
        return objectId
        */
    }

    
}