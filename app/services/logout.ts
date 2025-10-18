export const handleLogOut = async (router:any) =>{
    try{
        const res = await fetch("/api/logout")
        const response = await res.json()
        if(response.success){
            router.replace("/login")

            
        }
    }catch(err){

    }
}