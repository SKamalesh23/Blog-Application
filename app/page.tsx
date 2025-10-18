"use client"

import { useRouter } from "next/navigation";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import { getBlogsAsync } from "./redux/slicer/blogSlicer";
import {getUserAsync} from "./redux/slicer/UserInfoSlicer"
import SingleBlog from "./allblogs/singleBlog";
import AllBlogs from "./allblogs/AllBlogs";
import { success } from "zod";
import { AuthenticateUser } from "./services/AuthenticateUser";
export interface User {
  USER_Id:string;
  USER_FirstName: string;
  USER_LastName?: string;
  USER_Gender?: string | null;
  USER_Country: string;
  USER_Language: string;
  USER_Profile?: string | null;
  Username:string;
  total_blogs_count:string;
  followers_count:number;
}


export interface Blog {
  BLOG_Id: string; // or string if you convert BigInt to string
  BLOG_Title: string;
  BLOG_Image:string;
  BLOG_Tags:string;
  BLOG_Content: string;
  BLOG_likes_count:number;
  BLOG_comments_count:number;
  BLOG_Category: string;
  users_master: User;
}





// console.log("---->",initBlogs);

export default function Def() {

  const dispatch = useDispatch<AppDispatch>()

const initBlogs = useSelector((state:RootState)=>state.blogs.value)
const user = useSelector((state:RootState)=>state.user.value)
const status = useSelector((state:RootState)=>state.user.success)



  const [blogs,setBlogs] = useState<Blog[]>(initBlogs)
 
  const router = useRouter()
 
useEffect(()=>{
  AuthenticateUser(router)
},[])
useEffect(()=>{
  if(initBlogs.length===0){
    dispatch(getBlogsAsync())
  }

},[])
// useEffect(()=>{
//   dispatch(getUserAsync())
// },[])
//getBlogs
// 

  return (
    <div>
      
<AllBlogs initBlogs={initBlogs} /> 
      
      
    
    </div>
    
  );
}
