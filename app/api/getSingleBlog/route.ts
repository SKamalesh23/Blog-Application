import { NextResponse } from "next/server"
import {parse} from "cookie"
import { Prisma, PrismaClient } from "@prisma/client"
import { Decrypt,JSONToken } from "../functions/JWTauth"

const prisma = new PrismaClient()

export const GET = async (request:Request) =>{
    const cookies = parse(request.headers.get("cookie") || "") 
    const url = new URL(request.url)
    const blogId = url.searchParams.get("blogId")
    
    const token = cookies.token
    //Checking JWT Token  

    if(!token){
        console.log("No token Found");
        
        return NextResponse.json({status:false,message:"No Token Found"},{status:401})

    }
    const decryptedData = Decrypt(token) as JSONToken

    if(!decryptedData.data.userId){
        console.log("Incooorect data in JWT");
        
        return NextResponse.json({status:false,message:"Unauthenticated User"},{status:401})

    }
    if(!blogId){
        return NextResponse.json({status:false,message:"No Blog Id Found"},{status:201})
    }

    const blog = await prisma.blogs_master.findFirst({
        where:{
            BLOG_Id:Number(blogId)
        },
        include: {
            users_master: {
            select: {
                USER_FirstName: true,
                USER_LastName: true,
                USER_Gender: true,
                USER_Country: true,
                USER_Language: true,
                USER_Profile: true,
            },
    },
  },
    })

    // checks if the user liked or not
      const like = await prisma.user_likes_master.findFirst({
        where:{
            USERS_Id:decryptedData.data.userId,
            BLOG_Id:Number(blogId)
        }
  })
  console.log("like    =>    ",like);
  

    if(!blog){
        return NextResponse.json({status:"None",message:"Blog Not Found"})
    }
    const finalBlog = {...blog,BLOG_Id:blog?.BLOG_Id.toString(),USER_Id:blog.USER_Id.toString(),like:like?true:false}

    
    return NextResponse.json({status:"success",message:finalBlog},{status:200})



}