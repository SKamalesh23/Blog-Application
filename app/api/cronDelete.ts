import { CronJob } from "cron";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const startCron = ()=>{

    const job =new CronJob("* * * * *",async ()=>{
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000); // 1 min ago
        const row = await prisma.otp.deleteMany({
            where:{
                created_at:{
                    lt:oneMinuteAgo
                }
            }
        })
        console.log("Row Deleted : ",row)
    })
    job.start()
}
export default startCron;