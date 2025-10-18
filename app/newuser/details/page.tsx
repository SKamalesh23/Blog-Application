"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {z, ZodType} from "zod";
   const schema = z.object({
        firstName : z.string().min(3).max(12),
        lastName : z.string(),
        gender: z.enum(["MALE", "FEMALE"]),
        country:z.string().min(2),
        language:z.string(),

    })
type FormData =  z.infer<typeof schema>
const Component = () => {
    const [getInfo,setGetinfo] = useState<boolean>(true)
    const router = useRouter()

 
    const { register , handleSubmit , formState : {errors}} = useForm<FormData>({resolver:zodResolver(schema)})

    const submitData = async (data : FormData) =>{
        console.log("IT WORKED",data)
        try {
            const res = await fetch("/api/details",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        })
        if(!res.ok) throw new Error("Server Error")
            const dt = await res.json()
            if(dt.status==="success"){
                router.push("/")
            }
            
        } catch (error) {
            
        }
        
    }
    return (
        <div id="webcrumbs">
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-xl">
                    <div className="text-center flex flex-col  justify-center items-center">
                        <Image
                            src='/assets/blog-logo.png'
                            alt="Blog logo"
                            width={100}
                            height={100}
                        />
                        <p className="mt-0.5 text-sm text-gray-600">Create your account</p>
                    </div>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit(submitData)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    // required
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-primary-400"
                                    placeholder="John"
                                    {...register("firstName")}

                                />
                                {errors.firstName && <span className="text-red-400 text-sm">Enter FirstName</span>}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-primary-400"
                                    placeholder="Doe"
                                    {...register("lastName")}
                                />
                                {errors.firstName && <span className="text-red-400 text-sm">Enter lastName</span>}
                            </div>


                               
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                    Country
                                </label>
                                <select
                                    id="country"
                                    {...register("country")}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-primary-400"
                                >
                                    <option value="" >
                                        Select your country
                                    </option>
                                    <option value="USA">United States</option>
                                    <option value="CAN">Canada</option>
                                    <option value="UK">United Kingdom</option>
                                    <option value="AUS">Australia</option>
                                    <option value="GER">Germany</option>
                                    <option value="FRA">France</option>
                                    <option value="JPN">Japan</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.firstName && <span className="text-red-400 text-sm">Select Country</span>}
                            </div>

                            <div>
                                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                                    Language
                                </label>
                                <select
                                    id="language"
                                    {...register("language")}
                                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition-all duration-300 hover:border-primary-400"
                                >
                                    <option value="" defaultValue={""}>
                                        Select your language
                                    </option>
                                    <option value="en">English</option>
                                    <option value="es">Spanish</option>
                                    <option value="fr">French</option>
                                    <option value="de">German</option>
                                    <option value="zh">Chinese</option>
                                    <option value="ja">Japanese</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.firstName && <span className="text-red-400 text-sm">Select</span>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <div className="flex space-x-6 mt-1">
                                    <div className="flex items-center">
                                        <input
                                            id="gender-male"
                                    {...register("gender")}
                                            type="radio"
                                            value="MALE"
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                        />
                                        <label htmlFor="gender-male" className="ml-2 block text-sm text-gray-900">
                                            Male
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="gender-female"
                                    {...register("gender")}
                                            type="radio"
                                            value="FEMALE"
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                        />
                                        <label htmlFor="gender-female" className="ml-2 block text-sm text-gray-900">
                                            Female
                                        </label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            id="gender-other"
                                            name="gender"
                                            type="radio"
                                            value="other"
                                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                                        />
                                        <label htmlFor="gender-other" className="ml-2 block text-sm text-gray-900">
                                            Other
                                        </label>
                                    </div>
                                </div>
                                {errors.firstName && <span className="text-red-400 text-sm">Select Gender</span>}
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <span className="material-symbols-outlined text-primary-300 group-hover:text-primary-200 transition-colors duration-300">
                                        person_add
                                    </span>
                                </span>
                                Sign up
                            </button>
                        </div>
{/* 
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                                    <i className="fa-brands fa-facebook text-lg"></i>
                                </button>
                                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                                    <i className="fa-brands fa-twitter text-lg"></i>
                                </button>
                                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
                                    <i className="fa-brands fa-google text-lg"></i>
                                </button>
                            </div>
                        </div> */}
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?
                        <a
                            href="#"
                            className="font-medium text-primary-600 hover:text-primary-500 transition-colors duration-300 ml-1"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Component;