import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest)
{
    try{
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        const user = await User.findOne({email});

        if(user)
        {
            return NextResponse.json({success:false, message:"email already exists"});
        }

        const user2 = await User.findOne({username});

        if(user2)
        {
            return NextResponse.json({success:false, message:"username already exists"});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message:"user created successfully",
            savedUser,
            success:true
        });
    }
    catch(err:any){
        return NextResponse.json({success: false, message: err});
    }
}

