"use client";
import { useState } from "react";
import OTPverification from "./otp/page";
import Image from "next/image";
import Link from "next/link";
export default function VerifyEmail() {
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState(false);
  const [error,setError] = useState<string>("")
  const handleSubmit = async () => {
    try {
      const mail = {
        email: email,
      };
      const res = await fetch("/api", {
        method: "POST",
        body: JSON.stringify(mail),
      });
      if (!res.ok) throw new Error("Server error");
      const response = await res.json()
      if(response.status!==500){
        setSent((prev) => {
        return true;
      });
      }
      else{
        setError(response.message)
      }
      
    } catch (error) {}
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center ">
      <div>
        <div>
          <Image
            src="/assets/blog-logo.png"
            alt="Image"
            width={100}
            height={100}
          />
        </div>
      </div>
      {sent ? (
        <OTPverification email={email} />
      ) : (
        <div className="border-1 shadow-2xl p-5 rounded-2xl w-100">
          <p className="text-indigo-600 text-center">Enter Email to get OTP</p>
          <form className="flex flex-col p-3 gap-5 w-full">
            <input
              type="text"
              className="outline-1 outline-gray-500 p-2 rounded-2xl"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => {setEmail(e.currentTarget.value);setError("")}}
            />
            {
                error && <p className="text-red-500 text-sm text-center">Email already registered</p>

            }

            <button
              type="button"
              onClick={handleSubmit}
              className="bg-indigo-500 w-full p-2 text-white rounded-2xl"
            >
              Register
            </button>
          </form>
          <div className="text-center text-sm mt-2">Already a user?
            <Link href="/login" className="text-sm mt-2 text-blue-800">Sign In</Link>
          </div>
        </div>
      )}
    </div>
  );
}
