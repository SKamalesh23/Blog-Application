'use client'

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import OtpInput from "./otpInput"
interface Props{
    email:string
}
interface passError{
    password:string,
    confirmPassword:string
}
const schema = z.object({
    password:z.string()
    .min(8,"Minimum 8 Charachters")
    .max(15,"Maximum 15 Charachters")
    .regex(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,15}$/,
    "include at least 1 number and 1 special character"
    ),
    confirmPassword:z.string()
}).refine(data=>data.password===data.confirmPassword,{
    message:"Passwords wont match",
    path:["confirmPassword"]
})
type  PasswordForm = z.infer<typeof schema>
export default function OTPverification(props:Props){
    const lengthOtp = 4
    const [timer,setTimer] = useState<number>(60)
    const [verify,setVerify] = useState<boolean>(false)
    const [error,setError] = useState<boolean>(false)
    // const [otp,setOtp] = useState<string>("")
    // const [otpInput,setOtpInput] = useState<string[]>(new Array(4).fill(""))
    const otpRef = useRef([])
    const router = useRouter()
    
    const {register,handleSubmit,formState:{errors}} = useForm<PasswordForm>({
        resolver:zodResolver(schema)
    })

    const newTimer = () =>{
            const lessTimer = setInterval(()=>{
            setTimer(prev =>{
                if(prev ===0){
                    clearInterval(lessTimer)
                    return 0
                }
                return prev-1

            })
        },1000)
        }
    useEffect(()=>{
        
        newTimer()
    },[])

    const handleOtpSubmit = async (otp:string) =>{
        
        // alert()
        // return;
        try {
            const res = await fetch("/api/otpverify",{
                method:"POST",
                body:JSON.stringify({
                    otp:Number(otp),
                    email:props.email
                })
            })
            if(!res.ok) throw new Error("Error occured")
            const ans =await res.json()
        if(ans.message==="1"){
            setVerify(true)
            // router.push("/newuser/details",{
            //     message:"jii"
            // })
        }
        else{
            setError(true)
        }

        } catch (error) {
            
        }
    }
    const handleNewOtp = async () =>{
                try{
                    const res = await fetch("/api",{
                        method:"POST",
                        body:JSON.stringify(props.email)
                    })
                    const response = await res.json()
                }
                catch(error){
                    console.error(error)
                }
                setTimer(prev=> prev+60)
                newTimer()
    }

    const sendPasswords = async (data:PasswordForm) =>{
        try{
            const res = await fetch("/api/createUser",{
                method:"POST",
                headers:{
                    "contentType":"application/json"
                },
                body:JSON.stringify({email:props.email,password:data.password})
            })
            if(!res.ok) throw new Error("Error in creating Password")
            const response = await res.json()
            console.log("user created going to get details->",response)
            router.push('/newuser/details')


        }
        catch(err){

        }
        
        
    }
    return(
        <div className="h-screen w-screen flex justify-center items-center">
            {
                !verify ?  <div className="border-1 p-10 shadow-2xl rounded-2xl">
                <p className="text-sm p-5 pb-2 text-center">Enter the OTP received in given mail</p>
                {
                    error &&    
                <p className="text-red-400 text-sm text-center mb-3">Incorrect OTP</p>

                }
                <form className="flex flex-col gap-5">
                    <div className="flex justify-center">
                       <OtpInput lengt={4} handleOtpSubmit={handleOtpSubmit}/>
                    </div>
                    {/* <button type="button"  className="text-center bg-indigo-600 text-white w-full rounded-2xl p-2">Verify</button> */}
                    {
                        !timer &&                     <button type="button" onClick={handleNewOtp} className="text-center text-indigo-600 bg-white w-full rounded-2xl p-2">Resend OTP</button>

                    }
                </form>
                <div className="mt-2.5">
                    <p className="text-center text-blue-500">
                        00:{timer.toString().padStart(2, "0")}
                    </p>
                </div>
            </div>  
            :
  <div className="border-1 p-10 shadow-2xl rounded-2xl w-100">
                 <div className="text-center flex flex-col  justify-center items-center">
                                    <Image
                                        src='/assets/blog-logo.png'
                                        alt="Blog logo"
                                        width={100}
                                        height={100}
                                    />
                                </div>
                <form className="flex flex-col gap-10" onSubmit={handleSubmit(sendPasswords)}>
                    <div>
                          <input type="password"
                     className="outline-1 outline-indigo-600 rounded-md p-2 w-full inset-shadow-sm"
                     placeholder="Password"
                     {...register("password")}
                     />
                     {errors.password && <span className="text-red-400 text-sm">{errors.password.message}</span>}

                    </div>
                    <div>
                           <input 
                     type="password"
                    className="outline-1 outline-indigo-600 rounded-md p-2 w-full inset-shadow-sm"
                     placeholder="Confirm Password"
                     {...register("confirmPassword")}
                     />
                     {errors.confirmPassword && <span className="text-red-400 text-sm">{errors.confirmPassword.message}</span>}



                    </div>
                  
                    <button type="submit" className="bg-indigo-500 shadow-lg shadow-indigo-500 p-2 w-full rounded-md text-white font-semibold">CREATE PASSWORD</button>
                </form>
            </div>
            }
           
            

          

        </div>
    )
}