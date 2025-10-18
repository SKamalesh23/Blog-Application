export const VerifyUser = (token:string | undefined)=>{
     if(!token){
        return false
    }
    return token
}
