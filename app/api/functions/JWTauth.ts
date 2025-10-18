import jwt, { JwtPayload } from "jsonwebtoken";
export interface JSONToken extends JwtPayload {
    userId:string,
    userEmail:string
}
export const Encrypt = (data:JSONToken) =>{
    const token = jwt.sign(
        {data},
        process.env.JWT_PRIVATE_KEY!,
        {expiresIn:"1h"}
    )
    return token
}
export const Decrypt = (token:string) =>{
    try{
        const payloadData =  jwt.verify(token,process.env.JWT_PRIVATE_KEY!)
        return payloadData
    }catch(err){
        throw Error("Error in JWT")
    }
}