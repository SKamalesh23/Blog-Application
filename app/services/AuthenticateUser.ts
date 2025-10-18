export const AuthenticateUser = async (router:any) =>{
    // alert("In authe")
    try{
        const res = await fetch("/api/authenticate")
        const response = await res.json()
        if(response.status!=="success"){
            router.replace("/login")
        }
    }catch(err){
        console.error(err)
    }
}