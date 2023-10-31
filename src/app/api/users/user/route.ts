import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from '@/models/userModel';

connect();

export async function GET(request:NextRequest)
{
    try{
        const userId:any = await getTokenData(request);
        const user:any = await User.findOne({_id:userId}).select("-password");
        return NextResponse.json({success:true, user, message:"user found"});
    }
    catch(error:any){
        return NextResponse.json({success:false, message:`error fetching user data ${error}`});
    }
}