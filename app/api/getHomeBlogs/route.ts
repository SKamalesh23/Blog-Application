import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()
export const GET = async (req:Request) =>{
  
    const blogsWithUser = await prisma.blogs_master.findMany({
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
});



     const blogsSafe = blogsWithUser.map(blog => ({
    ...blog,
    BLOG_Id: blog.BLOG_Id.toString(), // convert BigInt to string
    USER_Id:blog.USER_Id.toString()
    // convert other BigInt fields if any
  }));
    return NextResponse.json({message:blogsSafe,status:"success"},{status:200})
}