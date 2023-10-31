import mongoose from 'mongoose';

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;
        connection.on("connected", ()=>{
            console.log("mongodb connected successfully");
        })
    }
    catch(err){
        console.log("cannot connect to db due the error: " + err);
    }
}