import { NextResponse } from "next/server"
import { likeComment, unlikeComment } from "../manageComments"
import { parse } from "cookie"
import { Decrypt, JSONToken } from "@/app/api/functions/JWTauth"

export const GET = async (request:Request)=>{
    const cookie = parse(request.headers.get("cookie")||"")
    const token = cookie.token;
    const decryptedData = Decrypt(token?token:"") as JSONToken
    const userId = decryptedData.data.userId
    const url = new URL(request.url)
    const commentId = url.searchParams.get("id")
    const like = url.searchParams.get("like")
    const username = url.searchParams.get("username")
    const blogId = url.searchParams.get("blogId")


    if(like==="0"){
        const data = likeComment(Number(commentId),username!,Number(blogId),Number(userId))
        if(!data) return NextResponse.json({status:"failure"},{status:500})
        return NextResponse.json({status:"success",message:"Comment liked successfully"},{status:200})
    }
    else{
        const data = unlikeComment(Number(commentId),Number(like),Number(blogId),Number(userId))
        if(!data) return NextResponse.json({status:"failure"},{status:500})

        return NextResponse.json({status:"success",message:"Comment unliked successfully"},{status:200})

    }

}