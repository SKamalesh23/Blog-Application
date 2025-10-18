import React, { useEffect, useState } from 'react'
import {  FaThumbsUp } from 'react-icons/fa';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownMenuSubContent } from '@radix-ui/react-dropdown-menu';
import { user_comments_likes } from '../blog/page';
interface CommentProp{
    username:string;
    comment:string;
    commentId:number;
    comment_like_count:number;
    selfname:string;
    blogId:string;
    user_comment_likes:user_comments_likes[]
}
const Comments = ({blogId,username,comment,commentId,comment_like_count,selfname,user_comment_likes}:CommentProp) => {
    const [commentLike,setCommentLike] = useState<number>(0)
    const [count,setCount] = useState<number>(comment_like_count)
    useEffect(() => {
        const checkLike = user_comment_likes.find(
            (item) => item.COMMENT_Id === commentId.toString()
        );

        setCommentLike(parseInt(checkLike?.COMMENT_LIKE_Id || "0")); // default 0 if undefined
    }, []);

    const handleCommentLike = async () =>{
        console.log("key===",commentId)
        const initLikeCount = commentLike
         if(commentLike>0){
                        setCount(count-1)
                        setCommentLike(0)

    
                        }
                    else{
                        setCount(count+1)
                        setCommentLike(1)

                    }
        try {
            const response = await fetch(`/api/interactions/comments/likes?id=${commentId}&like=${initLikeCount}&username=${selfname}&blogId=${blogId}`)
            const data = await response.json()
            if(data.status==="success"){
                   
            }
        } catch (error) {
            console.error("Error in liking comment : ",error)
        }
       
    }
  return (
     <div className="flex space-x-4" key={commentId}>
                                    <img
                                        src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwzfHxwcm9maWxlfGVufDB8fHx8MTc1OTg2NDAwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                                        alt="Commenter"
                                        className="w-10 h-10 mt-5 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex justify-between items-start mb-2">
                                         
                                                <div>
                                                    <h4 className="font-medium">{username}</h4>
                                                    <p className="text-xs text-gray-500">2 days ago</p>
                                                </div>
 <DropdownMenu>
      <DropdownMenuTrigger >
        <button className="text-gray-400 hover:text-gray-600">
          <span className="material-symbols-outlined outline-0 border-0 text-lg">more_vert</span>
        </button>
      </DropdownMenuTrigger>

        {
            username === selfname ?
        <DropdownMenuContent>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>

        :(
            <DropdownMenuContent>
                <DropdownMenuItem>Report</DropdownMenuItem>
            </DropdownMenuContent>
        ) 
        }  
    </DropdownMenu>
                                            </div>
                                            <p className="text-gray-700">
                                                {comment}
                                            </p>
                                            <div className="mt-3 flex items-center space-x-4">
                                                <button type='button' onClick={handleCommentLike} className="flex items-center space-x-1 text-xs text-gray-500 hover:text-primary-500 transition-colors">
                                                <FaThumbsUp size={24} stroke={commentLike>0?"#80A1BA":"black"} fill={commentLike>0?"#80A1BA":"white"} strokeWidth={10} width={20} />
                                                    <span>{count}</span>
                                                </button>
                                                <button className="flex items-center space-x-1 text-xs text-gray-500 hover:text-primary-500 transition-colors">
                                                    <span className="material-symbols-outlined text-sm">reply</span>
                                                    <span>Reply</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
  )
}

export default Comments