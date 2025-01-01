import { Router, Request, Response } from "express";
import IBook from "../interfaces/IBook";
import RegisterRequest from "../dto/RegisterRequest";
import UserService from "../services/user.service";
import LoginService from "../services/login.service";
import ILoginRequest from "../dto/ILoginRequest";
import { verifyToken } from "../middleware/auth.service";
import BookRequest from "../dto/BookRequest";
//import AuthService from "../middleware/auth.service";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.send("hello from server")
})

router.post('/login', async (req:Request, res: Response) => {
    console.log(req.body);
    
    try {
        const { email, password } = req.body
        if(!email || !password){
            throw new Error("required field is missing")
        }
        //const loginRequest = new LoginRequest(email, password)
        //console.log(loginRequest);
        const loginRequest:ILoginRequest = { email, password }
        const token = await LoginService.login(loginRequest)
        //console.log("token:", token);
        
        console.log("sending valid token")
        //res.send({token: "testToken" })
        res.send({ token })
        //const loginRequest = new LoginRequest(req.body.email, req.body.password)
    } catch (error) {
        console.log("throwing error");
        
        res.status(401).send({message:"some error!!!😠"})
    }
})

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { fullName, email, password } = req.body
        const registerRequest = new RegisterRequest(fullName, email, password)
        //const user = UserService.registerUser(registerRequest)
        const result = await UserService.registerUser(registerRequest)

        res.send(result)
    } catch (error) {
        
    }
})

router.delete('/removeBook', verifyToken, async (req: Request, res: Response) => {
    //console.log("remove book, email from token:", req.body.email)
    console.log("req body:", req.body)
    //console.log(`remove book, email from token:, ${req.body.email} \nbook objectId: ${req.body.objectId}`)
    //res.send(true)
    try {
        const {email, objectId} = req.body
        const result = await UserService.removeBook({email, objectId})
        res.json({result})
    } catch (error) {
        console.log("remove book error", error);
        res.status(400).json({message:"some error!!!😠"})
    }
})

// router.delete('delete/:id', verifyToken, async (req: Request, res: Response) => {
//     console.log();
    
//     try {
        
//     } catch (error) {
        
//     }
// })

router.post('/addBook', verifyToken, async (req: Request, res: Response) => {
    console.log("add book, email from token:", req.body.email)
    try {
        const {email, bookId, bookName, imageSrc} = req.body
        const bookRequest = new BookRequest(bookId, bookName, imageSrc, email)
        const objectId = await UserService.addBook(bookRequest)
        console.log("sending objectid", objectId);
        
        res.json({objectId})
        //res.send({message:`email from token: ${req.body.email}`})
    } catch (error) {
        console.log("add book error", error);
        //console.log(error);
        res.status(400).json({message:"some error!!!😠"})
    }
    
})

//router.get('/cart', AuthService.verifyToken, (req: Request, res: Response) => {
router.get('/cart', verifyToken, async (req: Request, res: Response) => {
    console.log("email from token:", req.body.email)
    try {
        const {email} = req.body
        const books = await UserService.getCart(email)
        res.send(books)
        //res.json({books})
        // const books: IBook[] = [
        //     {
        //         bookId: "2_zzAAAACAAJ",
        //         bookName: "Harry Potter and the Philosopher's Stone",
        //         imageSrc: "http://books.google.com/books/content?id=2_zzAAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
        //     },
        //     {
        //         bookId: "35rHBAAAQBAJ",
        //         bookName: "Harry Potter and the Philosopher's Stone",
        //         imageSrc: "http://books.google.com/books/content?id=35rHBAAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
        //     }
        // ]
        //res.send(books)
    } catch (error) {
        console.log("error happend");
        
        res.status(400).json({message:"some error!!!😠"})
    }
})

export default router