import { AuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { sendEmail } from "@/app/api/auth/mailjet"
import prisma from "@/utils/db"


const config: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        // @ts-expect-error
        {
            type: "email",
            id: "email",
            options: {
                type: "email",
                async sendVerificationRequest(params) {

                    await sendEmail(params.identifier, "", "", params.url)

                    return new Promise(res => {
                        setTimeout(res, 1000)
                    })
                },
            }
        }
    ],
    pages: {
        signIn: "auth/signin",
        verifyRequest: '/auth/verify-request'
    },
    secret: process.env.NEXT_AUTH_SECRET,
    callbacks: {
        session(params) {
            console.log(params)
            const newSession = {...params.session, user: params.user}
            return newSession
        },
    }
}


export default config