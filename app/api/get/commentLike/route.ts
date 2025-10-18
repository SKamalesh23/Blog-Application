import { parse } from "cookie"
import { Decrypt, JSONToken } from "../../functions/JWTauth"
import { NextResponse } from "next/server"
import { handleCommentLikes } from "./commentLike"

export const GET = async (request:Request) =>{
    const url = new URL(request.url)
    const blogId = url.searchParams.get("blogId")
    const cookie = parse(request.headers.get("cookie")||"")
    const token = cookie.token
    const decryptedData = Decrypt(token?token:"") as JSONToken
    if(!decryptedData.data.userId){
        return NextResponse.json({status:"failure",message:"Unauthorized access"},{status:401})
    }

    const result = await handleCommentLikes(Number(blogId),decryptedData.data.userId)

    if(!result){
        return NextResponse.json({status:"failure",message:"Internal Server Error"},{status:500})

    }
        return NextResponse.json({status:"success",message:result.reverse()},{status:200})

}