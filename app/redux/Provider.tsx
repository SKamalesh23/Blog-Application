"use client";

import { Provider, useDispatch } from "react-redux";
import { AppDispatch, store } from "./store";
import { useEffect } from "react";
import { getUserAsync } from "./slicer/UserInfoSlicer";
import { AuthenticateUser } from "../services/AuthenticateUser";
import { useRouter } from "next/navigation";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const WrapStore = ({children}:{children:React.ReactNode}) =>{
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
    useEffect(()=>{
    dispatch(getUserAsync())
  },[])
  useEffect(()=>{
    AuthenticateUser(router)
  },[])
    return(
      <>{children}</>
    )
  }
  
  return <Provider store={store}><WrapStore children={children}/></Provider>;
}
