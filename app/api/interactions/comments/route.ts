import { parse } from "cookie"
import { Decrypt, JSONToken } from "../../functions/JWTauth"
import { NextResponse } from "next/server"
import { addComment, updateComment } from "./manageComments"

export const POST = async (request:Request)=>{
    const data = await request.json()
    const cookie = parse(request.headers.get("cookie")||"")
    const token = cookie.token;
    const decryptedData = Decrypt(token?token:"") as JSONToken
    if(!decryptedData.data.userId){
        return NextResponse.json({status:"failure",message:"Unauthorized User"},{status:401})
    }
    data.userId=decryptedData.data.userId
    if(data.commentId){
       const result = await updateComment(data)
       if(!result){
            return NextResponse.json({status:"failure",message:"Internal Server Error"},{status:500})

       }
       return NextResponse.json({status:"success",message:"Comment Updated"},{status:200})

    }
    else{
       const result = await addComment(data)
        if(!result){
            return NextResponse.json({status:"failure",message:"Internal Server Error"},{status:500})

       }
       return NextResponse.json({status:"success",message:"Comment Saved"},{status:200})

    }





}