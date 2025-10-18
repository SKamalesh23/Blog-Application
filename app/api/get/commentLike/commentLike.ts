import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const handleCommentLikes = async (blogId:number,userID:number) =>{
    try{
          const likesWithComments = await prisma.user_comments_master.findMany({
            where:{
                // USERS_Id:16,
                BLOG_Id:blogId,
              
            },
        include: {
            user_comments_like_master: {
                where:{
                    USER_Id:userID
                },
                select: {
                    COMMENT_LIKE_Id:true,
                    COMMENT_Id: true,
                },
            },
        },
        });
     const result = likesWithComments.map((comment) => ({
        ...comment,
        COMMENT_Id: comment.COMMENT_Id.toString(),
        BLOG_Id: comment.BLOG_Id?.toString(),
        USERS_Id: comment.USERS_Id?.toString(),
        user_comments_like_master: comment.user_comments_like_master.map((item) => ({
            COMMENT_Id: item.COMMENT_Id.toString(),
            COMMENT_LIKE_Id:item.COMMENT_LIKE_Id.toString()
        })),
    }));

        console.log("comment like => ",result);
        
        return result
    }catch(err){
        console.error(err)
    }
        

}