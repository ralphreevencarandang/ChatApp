import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { connectDB } from './config/db.js';
import authRoute from '../src/routes/authRoute.js'
import messageRoute from '../src/routes/messageRoute.js'
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001

await connectDB();

app.use(express.json(
    // default kase is 100KB lang so mag e-error siya pag nag pasa tayo ng malaking file size
    // so need natin iconfig yung limit into 10mb
    // {limit: '10mb'}
));
// this will allow your server handle larger image without throwing the error
// app.use(express.urlencoded({extended:true, limit: '10mb'}))
app.use(cookieParser());

app.use('/api/auth', authRoute)
app.use('/api/message', messageRoute)



app.listen(PORT, ()=>{
    console.log(`This server is running on http://localhost:${PORT}`);
    
})