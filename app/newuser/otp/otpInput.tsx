import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import React from 'react'
import { ChangeHandler } from 'react-hook-form';
interface Len{
    lengt:number;
    // setOtp:(value:string)=>void;
    handleOtpSubmit:(value:string)=>void;
}
const OtpInput = (props:Len) => {
    const {lengt,handleOtpSubmit} = props
    const [otpInput,setOtpInput] = useState(new Array(props.lengt).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

        //Focusing on the first input box 

        useEffect(()=>{
            inputRefs.current[0]?.focus()
        },[])
    //Changing Values
    const handleChange = (e:ChangeEvent<HTMLInputElement>,index:number) =>{
        const val = e.target.value;
        
        if(isNaN(Number(val)))return // return if the input value is not Number
        const otpInit = [...otpInput]
        // console.log(e.currentTarget);

        
        otpInit[index] = val.substring(val.length-1)
        setOtpInput(otpInit)

        const finalOtp = otpInit.join("")

        if(lengt===finalOtp.length){
            // setOtp(finalOtp)
            handleOtpSubmit(finalOtp)
        }
        if (val && index < lengt - 1) {
        inputRefs.current[index + 1]?.focus();
    }


    }
    //Click Function
    const handleClick = () =>{

    }
const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
        e.preventDefault(); // prevent default browser behavior

        const otpInit = [...otpInput];

        // Always clear current input
        otpInit[index] = "";
        setOtpInput(otpInit);

        // Move focus to previous input if exists
        if (index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }
};


  return (
    <div className='flex gap-3'>

        {otpInput.map((value,index)=>(
            <input
            key={index}
            ref = {(input)=>{inputRefs.current[index]=input}}
            value={otpInput[index]}
            onChange={(e)=>handleChange(e,index)}
            onClick={handleClick}
            onKeyDown={(e)=>handleKeyDown(e,index)}
            className='outline-1 p-3 text-xl outline-gray-400 w-10 h-10 text-center rounded-md focus:border-2 border-indigo-500'
            />

        ))}
    </div>
  )
}

export default OtpInput