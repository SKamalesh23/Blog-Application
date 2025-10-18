import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
export const handleLike = async (blogId : number , like : boolean,username:string) => {

    try{
        const response = await fetch(`/api/interactions/likes?blogId=${blogId}&like=${like}&username=${username}`)
        const res = await response.json()
        if(res.status==="success"){
            return res.status
        }
    }catch(err){
        console.error(err)
    }
}

export const handleComment = async (blogId:number,comment:string,username:string) =>{
    const data ={
        blogId:blogId,
        comment:comment,
        username:username
    }
    try{
        const response = await fetch("/api/interactions/comments",{
            method:"POST",
            body:JSON.stringify(data)
        })
        const res = await response.json()
        if(res.status==="success"){
            return true
        }
    }catch(err){
        console.error(err)
    }
}