import fs from "fs";
import path from "path";
import UploadBlog from "./uploadBlog";
import { NextRequest,NextResponse } from "next/server";
import {parse} from "cookie"
import { Decrypt, JSONToken } from "../functions/JWTauth";
export const POST = async (req: NextRequest) => {
  try {
    const cookies = parse(req.headers.get("cookie") || "");
    const token = cookies.token;
    if(!token){
        return NextResponse.json({message:"No Token Availabe"},{status:401})
    }
    const decryptedData = Decrypt(token) as JSONToken;

      if(!decryptedData.data.userId){
    return NextResponse.json({error:"Unautherticated User"},{status:401})
}

    const formData = await req.formData(); // ✅ works only if request is multipart/form-data
    const title  = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const tags = formData.get("tags")?.toString();
    const category = formData.get("category")?.toString();
    const image = formData.get("image") as File; // Blob/File

    // Convert File/Blob to Node Buffer to save
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
 
    
    

    const uploadsDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    fs.writeFileSync(path.join(uploadsDir, image.name), buffer);

    const result = await UploadBlog(title!,content!,tags!,category!,`public/uploads/${image.name}`,decryptedData.data.userId)
    if(result){
    return NextResponse.json({ message: "Blog uploaded successfully", filename: image.name ,status:"success"});

    }
    else{
    return NextResponse.json({ message: "Cant Upload Blogs"});

    }

  } catch (err) {
    console.error("Error parsing form data:", err);
    return NextResponse.json({ error: "Failed to parse form data" }, { status: 500 });
  }
};
