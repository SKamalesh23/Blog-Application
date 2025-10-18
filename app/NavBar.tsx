import Link from "next/link"
import Image from "next/image";
import { BsFilePost } from "react-icons/bs";
import { GrHomeRounded } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button"
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"], // or ["latin-ext"] etc.
  weight: ["400", "500", "600", "700"], // choose the weights you need
});
export default function NavBar(){
    console.log("server or Client");
    
    return(
        <div className={montserrat.className +" w-screen xl:w-40 xl:h-screen bg-indigo-500 "}>
            <div className="  justify-center hidden xl:flex">
                <Image
                src="/assets/blog-logo.png"
                alt="Barnd Logo"
                width={100}
                height={100}
                />
            </div>
                <nav className="flex justify-center gap-10 w-full">
                    <ul className="flex w-full xl:justify-center justify-evenly xl:flex-col text-amber-50 font-serif">
                        <li className={montserrat.className + " text-center hover:bg-indigo-400"} ><Link href={'/'} className="w-full flex items-center p-4 gap-1  hover:"><GrHomeRounded /><span className="hidden xl:block">Home</span></Link></li>
                        {/* <li><Link href={'/about'}>New Blog</Link></li> */}
                        <li className={montserrat.className + " text-center hover:bg-indigo-400"}><Link href={'/add'} className="w-full flex items-center p-4 gap-1"><IoAddCircleOutline/><span className="hidden xl:block">Blog</span></Link></li>
                        <li className={montserrat.className + " text-center hover:bg-indigo-400"}><Link href={'/blogs/viewblogs'} className="w-full flex items-center gap-1 p-4  hover:"><BsFilePost/> <span className="hidden xl:block">View</span> </Link></li>
                        <li className={montserrat.className + " text-center hover:bg-indigo-400"}><Link href={'/profile'} className="w-full flex items-center gap-1 p-4  hover:"><FaRegUserCircle/> <span className="hidden xl:block">Profile</span> </Link></li>
                    </ul>
                </nav>
        </div>
    )
}