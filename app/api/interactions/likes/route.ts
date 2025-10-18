//packeges
import {parse} from 'cookie'
import { NextResponse } from 'next/server'
import { Decrypt } from '../../functions/JWTauth'
import { JwtPayload } from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

//primsa logic

const prisma = new PrismaClient()

export const GET = async (request:Request) =>{
    //GET blog id from params
    const {searchParams} = new URL (request.url)

    const blogId = searchParams.get("blogId")
    const likeStatus = searchParams.get("like")==="true"
    const username = searchParams.get("username")
    if(!blogId){
        return
    }
    const cookie = parse(request.headers.get("cookie")||"")
    if(!cookie.token){
        return NextResponse.json({status:"failure",message:"Unauthorized"},{status:401})
    }

    const decryptedData = Decrypt(cookie.token) as JwtPayload
     if(!decryptedData.data.userId){
    return NextResponse.json({error:"Unautherticated User"},{status:401})
}


if(likeStatus){
        // if the user already liked unlike it

    const like = await prisma.user_likes_master.deleteMany({
    where:{
        USERS_Id:decryptedData.data.userId,
        BLOG_Id:Number(blogId)
    }
})
if(!like){
    return NextResponse.json({message:"Programmatic Error",status:"failure"},{status:500})
}
 const updatedBlog = await prisma.blogs_master.update({
      where: { BLOG_Id: BigInt(blogId) },
      data: {
        BLOG_likes_count: {
          decrement: 1,
        },
      },
      select: {
        BLOG_Id: true,
        BLOG_likes_count: true,
      },
    })
}
else{
    // User like the Blog 

const like = await prisma.user_likes_master.create({
    data:{
        USERS_Id:decryptedData.data.userId,
        Username:username,
        BLOG_Id:Number(blogId)
    }
})
if(!like){
    return NextResponse.json({message:"Programmatic Error",status:"failure"},{status:500})
}
 const updatedBlog = await prisma.blogs_master.update({
      where: { BLOG_Id: BigInt(blogId) },
      data: {
        BLOG_likes_count: {
          increment: 1,
        },
      },
      select: {
        BLOG_Id: true,
        BLOG_likes_count: true,
      },
    })

}
    
    return NextResponse.json({status:"success"},{status:200})
    
}