import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { Decrypt, JSONToken } from "../functions/JWTauth";
import { parse } from "cookie";

const prisma = new PrismaClient();

export const POST = async (request: NextRequest) => {
  const details = await request.json();
  const cookies = parse(request.headers.get("cookie") || "");
  const token = cookies.token
  if(!token){
    return NextResponse.json({message:"UnAUthenticated User"})
  }
  const decryptedData = Decrypt(token) as JSONToken;

if(!decryptedData.data.userId){
    return NextResponse.json({error:"Unautherticated User"},{status:401})
}
  const newUserDetails = await prisma.users_master.create({
    data: {
      USER_FirstName: details.firstName,
      USER_LastName: details.lastName,
      USER_Gender: details.gender,
      USER_Country: details.country,
      USER_Language: details.language,
      USER_Id: Number(decryptedData.data.userId)
    },
  });
  return NextResponse.json({ message: "User Created",status:"success" },{status:200});
};
