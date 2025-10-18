'use client'
import { handleLogOut } from "../services/logout"
import { User } from "../page"
import React, { useEffect } from "react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import NavBar from "../NavBar"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../redux/store"
import { UseDispatch } from "react-redux"
import { getUserAsync } from "../redux/slicer/UserInfoSlicer"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { _USER } from "../redux/slicer/UserInfoSlicer"

//authorize
import { AuthenticateUser } from "../services/AuthenticateUser"
import { ProfileHeader } from "./profieComponents/profileHeader"
import Footer from "../Footer"

export default function Component(){
    const dispatch = useDispatch<AppDispatch>()
    const {user,blogs}:_USER = useSelector((state:RootState)=>state.user.value)
    console.log("Dispatch ==>",user);
    const router = useRouter()

    
    // const [blog,setBlog]
    // useEffect(()=>{
    //     AuthenticateUser(router)
    //     dispatch(getUserAsync())
    // },[])

  
    return (
        <div id="webcrumbs" className="">
            <div className="fixed bottom-0">
                <NavBar/>
            </div>
           
           
            <div className="mb-10 xl:mb-0 xl:ml-40 bg-gray-100 min-h-screen relative">
                {/* Profile Header */}
             
                <ProfileHeader followers_count={user.followers_count} firstname={user.USER_FirstName} blogsCount={blogs.length} lastname={user.USER_LastName!} username={user.Username}/>

                {/* Content Section */}
                    <div className="grid grid-cols-3">
                        {
                            blogs.map(item=>(
                                <div className="h-80 hover:cursor-pointer text-center border-2 ">
                                    <img 
                                    src={`${item.BLOG_Image.slice(6)}`}
                                    className="h-full w-full"
                                    />
                                </div>
                            ))
                        }
                    </div>
                {/* Footer */}
                <div className="absolute w-full bottom-0">
                <Footer/>

                </div>

                {/* Next: "Add a notification panel dropdown in the header" */}
                {/* Next: "Add a blog post analytics section showing growth charts" */}
                {/* Next: "Add a drafts section for in-progress blog posts" */}
            </div>
        </div>
    )
}
