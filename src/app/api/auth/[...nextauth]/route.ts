import NextAuth from "next-auth/next"
import { AuthOptions } from "next-auth"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { sendEmail } from "../mailjet"

const prismaClient = new PrismaClient()


const authConfig: AuthOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        // @ts-expect-error
        {
            type: "email",
            id: "email",
            options: {
                type: "email",
                async sendVerificationRequest(params) {
                    console.log("sending params", params)

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
    secret: process.env.NEXT_AUTH_SECRET
}

const handler = NextAuth(authConfig)
export { handler as GET, handler as POST }
