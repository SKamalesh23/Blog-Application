import { ChangeEvent, useRef, useState } from "react"
import { getSearchSuggestion } from "../services/searchUser";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
interface Users{
    USER_Id:string;
    Username:string;
}
export const SearchUser = () =>{
     const [searchValue,setSearchValue] = useState<string>("")
        const [suggestedUsers,setSuggestedUsers] = useState<Users[]>([])
        const inputRef = useRef(null)
        const handleSearchValue = async (e:ChangeEvent<HTMLInputElement>) =>{
            const value = e.target.value;
            setSearchValue(value)
            if(value.length>2){
                const users = await getSearchSuggestion(value)
                setSuggestedUsers(users)
    
            }
        }
    return(
        <div>
            <div className="w-100 relative">
                            <input 
                        ref={inputRef}
                        type="text"
                        placeholder="Search User"
                        value={searchValue}
                        onChange={(e)=>handleSearchValue(e)}
                        className="outline-1 p-2 rounded-xl w-100 pl-8"
                        />
                        <FaSearch color="#c9c9d9" className="absolute top-3 left-2"/>
            </div>
            {
                searchValue.length>1 ? (
                      <ul className="bg-white shadow-xl absolute top-11 w-100">
                {
                    suggestedUsers.map((user)=>(
                        <Link href={"/"}>
                                <li className="border-b p-2">{user.Username}</li>
                        </Link>
                    ))
                }
              
            </ul>
                )
                :
                (
                    null
                )
            }
          
        </div>
              
                        
    )
}