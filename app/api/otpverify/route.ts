import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient()
export const POST = async (request:Request) =>{
    const data = await request.json()
    
    const user = await prisma.otp.findFirst({
    where: {
      OTP_Email: data.email,
      OTP_Number:data.otp
    },
    select: {
      OTP_Number: true, // assuming your OTP column is named 'OTP'
      OTP_Email:true
    },
  });
  console.log("--->",user);
  if(!user){
    return NextResponse.json({message:"0"})
  }
  const deleteOTP = await prisma.otp.delete({
    where:{
        OTP_Email:data.email
    }
  })
  return NextResponse.json({message:"1"})
  
}