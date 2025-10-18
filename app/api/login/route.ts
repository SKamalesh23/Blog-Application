import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { Encrypt } from '../functions/JWTauth'
import { NextResponse } from 'next/server'
import { serialize } from "cookie";

const prisma = new PrismaClient()
export const POST = async (req:Request) =>{
    const {email,password} = await req.json()
    const user = await prisma.credentials.findFirst({
        where:{
            User_Email:email,
        },
        select:{
            User_Email:true,
            User_Password:true,
            User_Id:true
        }
    })
    if(!user){
        return NextResponse.json({message:"No Email exists",status:"failure"},{status:401})
    }
    const validuser = await bcrypt.compare(password,user.User_Password)
    if(!validuser){
        return NextResponse.json({message:"Incorrect Password",status:"failure"},{status:401})
    }
      //getting Username from DB

   
      const token =Encrypt({ userId: user.User_Id.toString(), userEmail: user.User_Email });
  
      const cookie = serialize("token", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60,
      });
      return NextResponse.json(
        { success: true },
        {
          headers: {
            "Set-Cookie": cookie,
          },
        }
      );

}