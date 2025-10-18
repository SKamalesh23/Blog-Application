"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { type Blog } from "@/app/page";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaHeart } from "react-icons/fa";
import { handleComment, handleLike } from "@/app/services/interactions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { getUserAsync } from "@/app/redux/slicer/UserInfoSlicer";
import Comments from "../componenets/Comments";
import DOMPurify from "dompurify";

interface Comments{
    COMMENT_Id:number;
    USER_Comments:string;
    Username:string;
    comment_like_count:number;
}
export interface user_comments_likes{
    COMMENT_Id:string,
    COMMENT_LIKE_Id:string
}
export interface CommmentLikes{
    BLOG_Id:string;
    USERS_Id:string;
    Username:string;
    COMMENT_Id:string;
    USER_Comments:string;
    comment_like_count:number;
    user_comments_like_master:user_comments_likes[]
}
const SingleBlog = () => {
    const [blog, setBlog] = useState<Blog>();
    const [like,setLike] = useState<boolean>(false);
    const [comments,setComments] = useState<Comments[]>([])
    const [commentLikes,setCommentLikes] = useState<CommmentLikes[]>([])
    const router = useRouter()
    const searchParams = useSearchParams();
    const blogId = searchParams?.get("blogId");
    const user = useSelector((state:RootState)=>state.user.value)
    const self_username = user?.user?.Username
 
    const getBlogDetails = async () => {
        console.log("Error");
    
        try {
        const res = await fetch(`/api/getSingleBlog?blogId=${blogId}`);
        const response = await res.json();
        if (response.status === "success") {
            // console.log(response.message)
            setBlog(response.message);
            setLike(response.message.like)
        } 
        else if(!response.status){
            router.replace("/login")
        }
        else {
            throw new Error("Error In Server");
        }
        } catch (error) {}
    };
    useEffect(() => {
        // dispatch(getUserAsync())
        getBlogDetails();
    }, []);



    // get comment Likes
      const getCommentLikes = async () =>{
            try{
                const response = await fetch(`/api/get/commentLike?blogId=${blogId}`)
                const data = await response.json()
                if(data.status==="success"){
                    console.log(data.message);
                    setCommentLikes(data.message)
                    
                }
            }catch(err){

            }
        }
    useEffect(()=>{
      
            getCommentLikes()

    },[])
//Function for Like 
const handleClickLike =  async (id:number) =>{
        setLike(!like)
    console.log(user);
    
    const likeResult = await handleLike(id,like,user?.user.Username)
    if(likeResult==="success" && blog){
        if(like){
            console.log("Like =>",like);
            
        const updatedLikeCount = blog?.BLOG_likes_count - 1
        const updatedBlog = {...blog,BLOG_likes_count:updatedLikeCount}
        setBlog(updatedBlog)
        }
        else{
            const updatedLikeCount = blog?.BLOG_likes_count + 1
        const updatedBlog = {...blog,BLOG_likes_count:updatedLikeCount}
        setBlog(updatedBlog)
        }
        
    }

}



  const ShowBlog = () => {
  const [comment,setComment] = useState<string>("")
  const [loadComments,setLoadComments] = useState<number>(2)
const handleSaveComment = async () =>{
// setComments(prev => [
//   ...prev,
//   {
//     COMMENT_Id: prev.length > 0 ? prev[prev.length - 1].COMMENT_Id + 1 : 1, // start with 1 if empty
//     Username: user.user.Username,
//     USER_Comments: comment,
//     comment_like_count:0
//   }
// ]);
if(!blog)return
 if(comment.trim().length>0){
const initialBlog = {...blog,BLOG_comments_count:blog.BLOG_comments_count+1}
setBlog(initialBlog);
   
    const result = await handleComment(blog?.BLOG_Id,comment,user.user.Username)
    if(result){
        setComment("")
        getCommentLikes()
        
    }
    }
    
}
const handleChangeComment = (e:ChangeEvent<HTMLTextAreaElement>) =>{
    e.preventDefault()
    const cmt = e.target.value;
    setComment(cmt)
    

}
const increaseComment = () =>{
    if(loadComments+8 > commentLikes.length){
        const val = commentLikes.length - loadComments
        setLoadComments(loadComments+val)
        return
    }
    setLoadComments(loadComments+8)
}
    return (
     <div id="webcrumbs">
            <div className="bg-gray-100 min-h-screen py-8 px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header Image */}
                    <div className="relative h-[400px] w-full overflow-hidden">
                        <img
                            src={`${blog?.BLOG_Image.slice(6)}`}
                            alt="Blog header"
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-from-transparent bg-gradient-to-t from-black/80 to-transparent p-6">
                            <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold bg-primary-500 text-white mb-3 hover:bg-primary-600 transition-colors cursor-pointer">
                                {blog?.BLOG_Category}
                            </span>
                            <h1 className="text-3xl md:text-4xl font-bold text-white">
                                {blog?.BLOG_Title}
                            </h1>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8">
                        {/* Author and Meta Info */}
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxwcm9maWxlfGVufDB8fHx8MTc1OTg2NDAwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                                        alt="Author"
                                        className="w-12 h-12 rounded-full object-cover border-2 border-primary-300 hover:border-primary-500 transition-all"
                                    />
                                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                    <h3 className="font-medium">{blog?.users_master.USER_FirstName + " " + blog?.users_master.USER_LastName}</h3>
                                    <div className="text-sm text-gray-500 flex items-center">
                                        <span className="material-symbols-outlined text-sm mr-1">calendar_today</span>
                                        <span>May 15, 2023</span>
                                        <span className="mx-2">•</span>
                                        <span>8 min read</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <i className="fa-brands fa-twitter text-[#1DA1F2]"></i>
                                </button>
                                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <i className="fa-brands fa-facebook text-[#4267B2]"></i>
                                </button>
                                <button className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition-colors">
                                    <i className="fa-brands fa-linkedin text-[#0077b5]"></i>
                                </button>
                            </div>
                        </div>

                        {/* Blog Content */}
                        <article className="prose prose-lg max-w-none">
                            {
                                <div className="text-blog" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog?.BLOG_Content) }} />

                            }
                            {/* Next: "Add a code snippet example for service workers" */}
                        </article>

                        {/* Tags */}
                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <h3 className="text-lg font-medium mb-3">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                              
                                {
                                    blog?.BLOG_Tags.split(",").map((tag,index)=>(
                                          <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer">
                                    #{tag}
                                </span>
                                    ))
                                }
                             
                            </div>
                        </div>

                        {/* Engagement Section */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center space-x-1 group" onClick={(e)=>handleClickLike(parseInt(blog?.BLOG_Id))}>
                                        <FaHeart size={24} stroke={like?"red":"black"} fill={like?"red":"white"} strokeWidth={5} />
                                        <span className="text-gray-500 group-hover:text-red-500 transition-colors ">
                                            {blog?.BLOG_likes_count || 0} likes
                                        </span>
                                    </button>
                                    <button className="flex items-center space-x-1 group">
                                        <span className="material-symbols-outlined text-gray-400 group-hover:text-primary-500 transition-colors group-hover:scale-110 transform duration-200">
                                            comment
                                        </span>
                                        <span className="text-gray-500 group-hover:text-primary-500 transition-colors">
                                            {blog?.BLOG_comments_count || 0} comments
                                        </span>
                                    </button>
                                </div>
                                <button className="flex items-center space-x-1 group">
                                    <span className="material-symbols-outlined text-gray-400 group-hover:text-primary-500 transition-colors group-hover:scale-110 transform duration-200">
                                        bookmark
                                    </span>
                                    <span className="text-gray-500 group-hover:text-primary-500 transition-colors">
                                        Save
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <h3 className="text-xl font-bold mb-6">Comments ({blog?.BLOG_comments_count || 0})</h3>

                            {/* Comment Form */}
                            <div className="flex space-x-4 mb-8">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwyfHxwcm9maWxlfGVufDB8fHx8MTc1OTg2NDAwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                                    alt="Your profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div className="flex-1">
                                    <textarea
                                        placeholder="Add a comment..."
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-300 focus:border-primary-500 transition-all resize-none"
                                        rows={6}
                                        value={comment}
                                        onChange={(e)=>handleChangeComment(e)}
                                    ></textarea>
                                    <div className="mt-2 flex justify-end">
                                        <button type="button" onClick={handleSaveComment} className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
                                            Post Comment
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Comment List */}
                            <div className="bg-white p-3 ">
                                    <div className="space-y-6 ">
                                        {/* Comment 1 */}
                                        {
                                            commentLikes.length>0?
                                            commentLikes.slice(0,loadComments).map((comment)=>(
                                                <Comments key={comment.COMMENT_Id} commentLikes={commentLikes} user_comment_likes={comment.user_comments_like_master} blogId={blogId} username={comment.Username} selfname={self_username} comment={comment.USER_Comments} commentId={Number(comment.COMMENT_Id)} comment_like_count={comment.comment_like_count||0}/>

                                            ))
                                            :<h1 className="text-center text-xl font-bold text-indigo-500 animate-in">No comments yet</h1>
                                        }
                                    
                                    </div>
                                        {
                                            loadComments !== commentLikes.length &&
                                                <button type="button" onClick={increaseComment} className="w-full mt-6 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                                                    View more comments
                                                </button>
                                        }
                                 
                                </div>
                          </div>

                        {/* Related Posts */}
                        <div className="mt-10 pt-6 border-t border-gray-200">
                            <h3 className="text-xl font-bold mb-6">Related Articles</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Related Post 1 */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                            alt="Related post"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <span className="text-xs text-primary-600 font-semibold">JavaScript</span>
                                        <h4 className="font-semibold mt-1 group-hover:text-primary-500 transition-colors">
                                            10 JavaScript Tricks Every Developer Should Know
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                            Improve your code with these essential JavaScript techniques that will boost
                                            your productivity and code quality.
                                        </p>
                                    </div>
                                </div>

                                {/* Related Post 2 */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80"
                                            alt="Related post"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <span className="text-xs text-primary-600 font-semibold">Frontend</span>
                                        <h4 className="font-semibold mt-1 group-hover:text-primary-500 transition-colors">
                                            Building Responsive Layouts with CSS Grid
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                            Learn how to create modern, flexible layouts using CSS Grid that work across
                                            all device sizes.
                                        </p>
                                    </div>
                                </div>

                                {/* Related Post 3 */}
                                <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group">
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1503252947848-7338d3f92f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80"
                                            alt="Related post"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <span className="text-xs text-primary-600 font-semibold">Performance</span>
                                        <h4 className="font-semibold mt-1 group-hover:text-primary-500 transition-colors">
                                            Web Performance Optimization Techniques
                                        </h4>
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                                            Discover strategies to make your web applications faster and more efficient
                                            for all users.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };
  return <div>{blog && <ShowBlog />}</div>;
};

export default SingleBlog;
