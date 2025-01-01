import express from 'express';
import cors from 'cors';
//import dotenv from 'dotenv/config'
//import dotenv from 'dotenv';
import 'dotenv/config';
import router from './routes/router'
import {connect} from './config/db'

connect()

//dotenv.config();

console.log(`.env properties: ${process.env.PORT}`)

const app = express()
app.use(cors())
app.use(express.json())

app.use('/', router)

const PORT = process.env.PORT || 3355

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});