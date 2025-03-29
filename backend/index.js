import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from 'cors';
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes.js";
import iteemsRoute from "./routes/iteemsRoute.js";
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
const app = express()
const port=process.env.PORT || 3000;
const mongo_url=process.env.MongoUri;



app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:process.env.FRONTEND_URL,
  credentials:true,
  methods:["GET","POST","PUT","DELETE"]
}));

// app.use(express.urlencoded({ extended: true })); 

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir:"/tmp/"
}))

//connect mongoDb
try{
  mongoose.connect(mongo_url)
  console.log("connected to database")
}catch(error){
  console.log("Error",error)
}

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:  process.env.CLOUD_API_KEY, 
  api_secret:  process.env.CLOUD_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use('/user',userRoute)
app.use('/items',iteemsRoute)
// app.use('/blog',blogRoute)
app.listen(port,()=>{
    console.log("App is listening on port",port)
})