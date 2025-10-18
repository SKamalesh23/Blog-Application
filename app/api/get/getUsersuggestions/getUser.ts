import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
export const getUser = async (value:string) =>{
    const users = await prisma.users_master.findMany({
        where:{
            Username:{
                startsWith:value
            }
        },
        select:{
            Username:true,
            USER_Id:true,
            USER_Profile:true
        }
    })
    return users.slice(0,20)
}