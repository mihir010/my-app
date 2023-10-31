import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request:NextRequest)
{
    try{

        const reqBody = await request.json();
        const {email, password} = reqBody;
        
        const user = await User.findOne({email});
        
        if(user)
        {
            const valid = await bcryptjs.compare(password, user.password);
            
            if(valid)
            {
                // console.log(`hi ${user.username}`);
                const tokenData = {
                    id:user._id,
                    username: user.username,
                    email: user.email
                }

                const response =  NextResponse.json({success:true, message:`welcome ${user.username}`});

                const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1h"});

                response.cookies.set("token", token, {httpOnly: true});
                

                return response;
            }

            return NextResponse.json({success:false, message:"incorrect password"});
            
        }

        return NextResponse.json({success: false, message: "user does not exists"});
    }
    catch(err){
        NextResponse.json({success:false, message:err});
    }
}