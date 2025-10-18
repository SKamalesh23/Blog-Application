import { PrismaClient } from "@prisma/client"
import {parse} from "cookie"
import { VerifyUser } from "../functions/verifyUserCheck";
import { NextResponse } from "next/server";
import { Decrypt } from "../functions/JWTauth";
import { JSONToken } from "../functions/JWTauth";

//creating ORM

const prisma = new PrismaClient()
export const GET = async (req:Request) =>{
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.token
    
    if(!token){
        console.log("Invalid User");
        
        return NextResponse.json({status:false,message:"Invalid"},{status:401})
    }

    const decryptedData = Decrypt(token) as JSONToken;
    if(!decryptedData.data.userId){
        return NextResponse.json({status:false,message:"Invalid"},{status:401})
    }
    const user = await prisma.users_master.findFirst({
        where:{
            USER_Id:decryptedData.data.userId
        },
    })
    const blogs = await prisma.blogs_master.findMany({
        where:{
            USER_Id:decryptedData.data.userId
        }
    })
    
    const finalUser = {...user,USER_Id:user?.USER_Id.toString(),
        Id:user?.Id.toString(),
        total_blogs_count:user?.total_blogs_count?.toString()
    }

    const finalBlogs = blogs.map(blog=>({...blog,BLOG_Id:blog.BLOG_Id.toString(),USER_Id:blog.USER_Id.toString()}))


    return NextResponse.json({status:true,message:{user:finalUser,blogs:finalBlogs}},{status:200})
   
    
}