import { handleLogOut } from "@/app/services/logout"
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
import { useState } from "react"
import { useRouter } from "next/navigation"

interface ProfileHeadingProps{
    firstname:string;
    lastname:string;
    username:string;
    blogsCount:number;
    followers_count:number;

}
export const ProfileHeader = ({firstname,lastname,username,blogsCount,followers_count}:ProfileHeadingProps) =>{
    const [openLogDialog,setOpenLogDialog] = useState<boolean>(false)
    const router = useRouter()
    const handleLogOutt = () =>{
        handleLogOut(router)
    }
    return(
        <div className="bg-white shadow-md">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                            <div className="flex items-center mb-4 md:mb-0">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1690687505782-b7cc62530e0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MzkyNDZ8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcGljdHVyZXxlbnwwfHx8fDE3NTk0Mjc0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                        alt="Profile"
                                        className="w-20 h-20 rounded-full border-4 border-primary-500 object-cover transition-all duration-300 hover:scale-105"
                                        // keywords="profile picture, avatar, user profile"
                                    />
                                    <span className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full border-2 border-white"></span>
                                </div>
                                <div className="ml-4">
                                    <h1 className="text-2xl font-bold">{firstname + " "+ lastname}</h1>
                                    <p className="text-gray-600">@{username || "Username"}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-all">
                                    <span className="material-symbols-outlined">edit</span>
                                    Edit Profile
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all">
                                    <span className="material-symbols-outlined">settings</span>
                                    Settings
                                </button>
                                <button type="button" onClick={()=>setOpenLogDialog(true)} className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-all">
                                    <span className="material-symbols-outlined">logout</span>
                                    Logout
                    
                                </button>
                                <AlertDialog open={openLogDialog} onOpenChange={setOpenLogDialog}>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure to log out?</AlertDialogTitle>
                                        {/* <AlertDialogDescription>
                                           Are you sure about Log out?
                                        </AlertDialogDescription> */}
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-500" onClick={handleLogOutt}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                
              
                            </div>
                        </div>

                        <div className="flex justify-between mt-6 border-t pt-4">
                            <div className="text-center px-4 cursor-pointer hover:bg-gray-50 py-2 rounded-md transition-all">
                                <div className="text-xl font-bold">{blogsCount}</div>
                                <div className="text-gray-500 text-sm">Blogs</div>
                            </div>
                            <div className="text-center px-4 cursor-pointer hover:bg-gray-50 py-2 rounded-md transition-all">
                                <div className="text-xl font-bold">{followers_count}</div>
                                <div className="text-gray-500 text-sm">Followers</div>
                            </div>
                            <div className="text-center px-4 cursor-pointer hover:bg-gray-50 py-2 rounded-md transition-all">
                                <div className="text-xl font-bold">3.8K</div>
                                <div className="text-gray-500 text-sm">Interactions</div>
                            </div>
                            <div className="text-center px-4 cursor-pointer hover:bg-gray-50 py-2 rounded-md transition-all">
                                <div className="text-xl font-bold">89</div>
                                <div className="text-gray-500 text-sm">Hype Score</div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}