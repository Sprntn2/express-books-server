// import { Request, Response, NextFunction } from "express";
// import jwt, { JwtPayload } from 'jsonwebtoken';


// export default class AuthService{
//     static secret = process.env.JWT_SECRET || "some secret token"

//     static verifyToken(req: Request, res: Response, next: NextFunction){
//         console.log("verify token function");
        
//         const authHeader = req.headers.authorization;
//         console.log("auth header:", authHeader);
//         if(!authHeader) throw new Error('Authorization header missing')//res.status(401).json({ message: 'Authorization header missing' });
//         const token = authHeader?.split(' ')[1];
//         if(!token){
//             res.status(401).json({ message: 'Token missing' });
//             return
//         } 

//         //const decoded = jwt.verify(token, this.secret) || null
//         //const decoded = jwt.verify(token, this.secret) as JwtPayload
//         const decoded = jwt.verify(token, "some secret token") as JwtPayload
//         if(!decoded){
//             res.status(401).json({ message: 'invalid token' });
//             return
//         } 
//         const email = decoded.email
    
//         //req.email = email
//         req.body.email = email
        
//         next()
//     }   
// }

import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {

    const secret = process.env.JWT_SECRET || "some secret token"

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        console.log("token not found!!!😠😠😠")
        res.status(401).json({ message: 'Token missing' })
        return 
    } 
    
    try {
        const decoded = jwt.verify(token, secret)
        const email = (decoded as JwtPayload)?.email;
        req.body.email = email
        next()
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' })
        return 
    }
}