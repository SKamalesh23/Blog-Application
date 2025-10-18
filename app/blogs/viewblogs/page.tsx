'use client'
import { SearchUser } from "@/app/components/searchUser";
import NavBar from "@/app/NavBar";
import { getSearchSuggestion } from "@/app/services/searchUser";
import { ChangeEvent, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";



export default function ViewBlog(){

   
    
    return(
             <div>
               <div className="fixed bottom-0">
                 <NavBar />
               </div>
               <div
                 className={" xl:mb-10 h-screen bg-white xl:ml-40 mt-2"}
               >
                    <div className="flex justify-center relative" >
                    <SearchUser/>
                      
                    </div>

                </div>
            </div>
    )
}