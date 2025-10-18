import { parse,serialize } from "cookie"
import { NextResponse } from "next/server";

export const GET = async (request:Request) =>{
     const cookie = serialize("token", "token", {
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