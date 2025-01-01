import UserController from "../controllers/user.controller";
import ILoginRequest from "../dto/ILoginRequest";
import bcrypt from 'bcryptjs';
import {ObjectId} from 'mongodb'
//import Jwt from "jsonwebtoken";
import jwt from 'jsonwebtoken';
import IUser from "../interfaces/IUser";


export default class Loginservice{

    //static secret = process.env.JWT_SECRET as string
    static secret = process.env.JWT_SECRET || "some secret token"
    static saltRounds = 10;

    static async login(user: ILoginRequest): Promise<string>{
        //console.log("login service - login")
        const { email, password } = user
        //console.log("password", password);
        //const hashedPassword = await bcrypt.hash(password, this.saltRounds)
        // const dbPassword = await UserController.readSelectOne({email}, 'password') as string
        // if(!dbPassword) throw new Error("wrong email or password")
        // console.log(`db password: ${dbPassword}`)
        const dbUser = await UserController.readSelectOne({email}, 'password _id') as IUser
        if(!dbUser?.password) throw new Error("wrong email or password")
            //console.log(`db password: ${dbUser.password}`)
        //const match = await bcrypt.compare(dbUser.password, hashedPassword);
        const match = await bcrypt.compare(password, dbUser.password);
        console.log("match:", match);
        
        if(!match){
            console.log("wrong email or password");
            
            throw new Error("wrong email or password")
        }
        
        const objectId = dbUser._id as ObjectId
        console.log("user _id:", objectId);
        
        //const token: string = this.generateToken(email, dbUser._id)
        const token: string = this.generateToken(email, objectId)
        //console.log("token", token);
        
        if(!token) throw new Error("something went wrong")
        
        return token
        // const dbUser = await UserController.readOne({}, { password:1 })
        // console.log(`db password: ${dbUser.password}`)
        // const match = bcrypt.compare(dbUser.password, hashedPassword);
    }

    static generateToken(email: string, _id: ObjectId | undefined): string{
        
        
        // const token = Jwt.sign({
        //     email, 
        //     _id 
        // }, this.secret, {expiresIn: 172800})
        const token = jwt.sign({email, _id}, this.secret, { expiresIn: '1h' });
        
    
        return token
    }
}