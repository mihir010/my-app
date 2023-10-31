import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { decode } from "punycode";

export const getTokenData = (request:NextRequest) =>{
    try{
        const token = request.cookies.get("token")?.value||"";
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

        // console.log(decodedToken.id);

        return decodedToken.id;
    }
    catch(error){
        return NextResponse.json({success:false, message:error});
    }
}