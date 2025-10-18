'use client';
import React from "react"
import Link from "next/link"
import z from "zod"
import {useForm} from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
const schema = z.object({
    email:z.
    string()
    .nonempty({message:"Email Required"})
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,{message:"Enter Valid Email"}),
    password:z.
    string()
    .nonempty({message:"Password Required"})
    .min(8,{message:"Password must be atleast 8 charachters"})
})
type FormData = z.infer<typeof schema>

export default function Newuser(){
    const router = useRouter()
const {register,setError, handleSubmit ,formState:{errors}} = useForm<FormData>({resolver:zodResolver(schema)})

useEffect(() => {
    // Push the current login page into history stack
    window.history.pushState(null, "", window.location.href);

    const handlePopState = (event: PopStateEvent) => {
      // Prevent going back
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);


    const submitData = async (data : FormData) =>{
        try{
            const res = await fetch("/api/login",{
                method:"POST",
                headers:{
                    "content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            //verify response 
            const responseData = await res.json()
            
            if(responseData.success){
                console.log("Success");
                
                router.push("/")
            }
            else{
                if(responseData.message==="No Email exists"){
                setError("email",{type:"manual",message:responseData.message})

                }
                else{
                setError("password",{type:"manual",message:responseData.message})

                }
            }
        }catch(err){

        }
        
    }
    return (
        <div id="webcrumbs">
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-primary-600">BlogVerse</h1>
                        <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(submitData)}>
                        <div className="rounded-md space-y-4">
                            <div>
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    {...register("email")}
                                    type="text"
                                    
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-primary-400"
                                    placeholder="Email address"
                                />
                                {errors.email && <span className="text-red-400">{errors.email.message}</span>}

                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    {...register("password")}
                                    type="password"
                                    
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-primary-400"
                                    placeholder="Password"
                                />
                                {errors.password && <span className="text-red-400">{errors.password.message}</span>}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="#"
                                    className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-300"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-primary-300 group-hover:text-primary-200 transition-colors duration-300">
                                        lock
                                    </span>
                                </span>
                                Sign in
                            </button>
                        </div>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            {/* <div className="mt-6 grid grid-cols-3 gap-3">
                                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                                    <i className="fa-brands fa-facebook text-lg"></i>
                                </button>
                                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                                    <i className="fa-brands fa-twitter text-lg"></i>
                                </button>
                                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                                    <i className="fa-brands fa-google text-lg"></i>
                                </button>
                            </div> */}
                        </div>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Not a member?
                        <Link
                            href="/newuser"
                            className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-300 ml-1"
                        >
                            Register now
                        </Link>
                    </p>
                    {/* Next: "Add password strength indicator" */}
                    {/* Next: "Add dark mode toggle" */}
                    {/* Next: "Add animated logo at the top" */}
                </div>
            </div>
        </div>
    )
}

