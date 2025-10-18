import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Encrypt } from "../functions/JWTauth";
import { serialize } from "cookie";
const prisma = new PrismaClient();
export const POST = async (request: Request) => {
  const { email, password } = await request.json();

  const hashedPassword = await bcrypt.hash(password, 10);
  // console.log("Email before hasing : ", email);

  // console.log("hashed Password : ", hashedPassword);

  const user = await prisma.credentials.create({
    data: {
      User_Email: email,
      User_Password: hashedPassword,
      
    },
  });
  const token = Encrypt({ userId: user.User_Id.toString(), userEmail: user.User_Email });
  
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 10 * 60,
  });
  return NextResponse.json(
    { success: true },
    {
      headers: {
        "Set-Cookie": cookie,
      },
    }
  );
};
