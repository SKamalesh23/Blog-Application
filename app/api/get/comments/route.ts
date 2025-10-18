import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()
export const GET = async (request:Request) =>{
    const url = new URL(request.url)
    const blogId = url.searchParams.get("blogId")
    try {
        const comments = await prisma.user_comments_master.findMany({
        where:{
            BLOG_Id:Number(blogId)
        }
        })
        const finalComments = comments.map((comment)=>({
            ...comment,USERS_Id:comment.USERS_Id?.toString()
            ,BLOG_Id:comment.BLOG_Id?.toString()
            ,COMMENT_Id:comment.COMMENT_Id?.toString()
        }))
        return NextResponse.json({status:"success",message:finalComments.reverse()},{status:200})
    } catch (error) {
        console.error("Error in getting Comments : ",error)
        return NextResponse.json({status:"failure",message:"Internal server Error"},{status:500})

    }
    
}