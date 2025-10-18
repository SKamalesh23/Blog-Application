import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

interface Comment{
    commentId?:number;
    comment:string;
    username:string;
    userId:number;
    blogId:number;
}
export const addComment = async (data : Comment) =>{
    try{
        const comment = await prisma.user_comments_master.create({
        data:{
            BLOG_Id:data.blogId,
            USERS_Id:data.userId,
            USER_Comments:data.comment,
            Username:data.username
        }
    })

    const addCount = await prisma.blogs_master.update({
        where:{
            BLOG_Id:data.blogId
        },
        data:{
            BLOG_comments_count:{
                increment:1
            }
        }
    })
    return true
    }
    catch(err){
        console.error(err)
        return false
    }       
}
export const likeComment = async (id:number,username:string,blogId:number,userId:number) =>{
    try {
          const like_master = await prisma.user_comments_like_master.create({
            data:{
                USER_Id:userId,
                Username:username,
                BLOG_Id:blogId,
                COMMENT_Id:id
            }
        })
        const like = await prisma.user_comments_master.update({
        where:{
            COMMENT_Id:id
        },
        data:{
            comment_like_count:{
                increment:1
            }
        }
        })
      
        return true
    } catch (error) {
            return false
    }
   
}
export const unlikeComment = async (id:number,likeid:number,blogId:number,userId:number) =>{
    try{

          const like = await prisma.user_comments_master.update({
        where:{
            COMMENT_Id:id
        },
        data:{
            comment_like_count:{
                decrement:1
            }
        }
    })
       
      const like_master = await prisma.user_comments_like_master.delete({
            where:{
                COMMENT_LIKE_Id:likeid
            }
        })
        return true
    }catch(err){
        return false
    }
  
}
export const updateComment = async (data : Comment) =>{
    try {
        const comment = await prisma.user_comments_master.update({
        where:{
            COMMENT_Id:data.commentId
        },
        data:{
            USER_Comments:data.comment,
        }
    })
    

    return true

    } catch (error) {
        return false
    }
  
}