import { NextResponse } from "next/server"
import { createPool } from "mysql2"
import { PrismaClient } from "@prisma/client"
import startCron from "./cronDelete"
import { sendMail } from "./functions/nodemailer"
// import { request } from "http"
const prisma = new PrismaClient()

// Create a test account or replace with real credentials.


// Wrap in an async IIFE so we can use await.
startCron();
export const POST = async (request:Request) =>{
    const {email} = await request.json()
    const otp : number = Math.floor(Math.random()*9000)+1000;
   
    const subject = "Email Verification"
    const text = "OTP VERIFICATION"
    const html = `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color: #333;">🔐 Your OTP Code</h2>
      <p>Hello,</p>
      <p>Your <strong>One-Time Password (OTP)</strong> is: ></p>
      <p style="font-size: 24px; font-weight: bold; color: #1a73e8; text-align: center; letter-spacing: 4px;">${otp}</p>
      <p>This code will expire in <strong>5 minutes</strong>.</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
      <br />
      <p>Thanks,<br />Kam Blogs Team</p>
    </div>
  </body>
</html>
`
       const existingUser = await prisma.credentials.findUnique({
        where:{
            User_Email:email
        }
    })
    if(existingUser){
        return NextResponse.json({status:500,message:"Email Already exists"})
    }
    sendMail(email,subject,text,html)
    const mailExist = await prisma.otp.findFirst({
        where:{
            OTP_Email:email
        },
        select:{
            OTP_Email:true
        }
    })
    if(mailExist){
        const otpUpdate = await prisma.otp.update({
            where:{
                OTP_Email:email
            },
            data:{
                OTP_Number:otp
            }
        })
    }
    else{
         const setOtp = await prisma.otp.create({
        data:{
            OTP_Email:email,
            OTP_Number:otp
        }
    })
    }    
    return NextResponse.json({message:"OTP Created Successfully"})
    
}





