import { handleServerSession } from "@/utils/api"
import prisma from "@/utils/db"
import { NextResponse } from "next/server"

export const GET = () => {
    return handleServerSession(async (session) => {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: session.user.id
                },
                include: {
                    schoolOwner: true
                }
            })

            console.log(user)

            return NextResponse.json({ message: "Returned user details", errors: [], data: user })
        } catch (error) {
            return NextResponse.json({ message: "Error while retrieving user details", errors: [error], data: null })
        }

    })
}