import { AuthOptions, type Session } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { sendEmail } from "@/app/api/auth/mailjet"
import prisma from "@/utils/db"
import { getUserFullName } from "@/utils/shared"


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
        session({ session, user }) {
            const newSession = { ...session, user }
            return newSession
        },
    }
}


export default config