import { parse } from "cookie"
import { NextResponse } from "next/server"
import { Decrypt } from "../functions/JWTauth"
import { JwtPayload } from "jsonwebtoken"

export const GET = async (request:Request)=>{
    const cookie =  parse(request.headers.get("cookie")||"")
    const token = cookie.token
    if(!token || token==="token"){
        return NextResponse.json({status:"failure",message:"Unauthenticated User"},{status:401})
    }
    const decryptedData = Decrypt(token) as JwtPayload
    
    if(!decryptedData?.data.userId){
        return NextResponse.json({status:"failure",message:"Unauthenticated User"},{status:401})
    }
    return NextResponse.json({status:"success",message:"Authorized"},{status:200})
    
}