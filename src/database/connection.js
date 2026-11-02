import mongoose, { trusted } from "mongoose";
import { mongo_uri } from "../config/config.service.js";


export const connectDB= async()=>{
    try {
        await mongoose.connect(mongo_uri);
        await mongoose.syncIndexes()
        console.log(`DB connected`);
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}