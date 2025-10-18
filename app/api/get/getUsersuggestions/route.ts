import { NextResponse } from "next/server"
import { getUser } from "./getUser"

export const GET = async (request: Request) =>{
    const url = new URL(request.url)
    const search = url.searchParams.get("search")
    const result = await getUser(search||"")
    const finalUsers = result.map((item)=>({...item,USER_Id:item.USER_Id.toString()}))
    return NextResponse.json({status:"success",message:finalUsers},{status:200})
}