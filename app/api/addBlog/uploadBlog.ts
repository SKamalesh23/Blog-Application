import { PrismaClient } from "@prisma/client";
interface Blog{
    title:string,
    content:string,
    tags:string,
    category:string,
    image:string,
    userId:number

}
const prisma = new PrismaClient();

const UploadBlog = async (title: string , content: string, tags: string , category: string , image: string, userId: number) =>{
    
    const load = await prisma.blogs_master.create({
        data:{
            BLOG_Title:title,
            BLOG_Content:content,
            BLOG_Category:category,
            BLOG_Tags:tags,
            BLOG_Image:image,
            USER_Id:BigInt(userId),
            BLOG_likes_count:0,
            BLOG_comments_count:0
        }
    })
    console.log("File uploaded to DB : ",load)
    return true
}

export default UploadBlog;