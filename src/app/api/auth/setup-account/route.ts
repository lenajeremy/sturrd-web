import { NextRequest, NextResponse } from "next/server";
import { handleServerSession } from "@/utils/api";
import prisma from "@/utils/db";
import { UserTypes, type UserTypes as TUserTypes } from "@prisma/client";
import { z } from 'zod'

const VALUES = [UserTypes.PARENT, UserTypes.SCHOOL_ADMIN, UserTypes.STUDENT] as const

const SetupAccountRequestBody = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    userType: z.enum(VALUES).optional()
})

export async function POST(request: NextRequest, response: NextResponse) {

    return handleServerSession(async (session) => {
        const userId = session.user.id
        const requestBody = await request.json()

        try {

            const data = SetupAccountRequestBody.parse(requestBody)

            // users should not be able to change their usertype... A school owner cannot become a student ever
            if (session.user.userType !== UserTypes.BASE_USER) {
                return NextResponse.json({
                    message: "Account type has already been set",
                    data: null,
                    errors: ["Unable to change account type"]
                }, { status: 403 })
            }


            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    userType: data.userType,
                    firstName: data.firstName,
                    lastName: data.lastName
                }
            })

            return NextResponse.json({ message: "User updated successfully", data: user, errors: [] })
        } catch (error) {
            console.error(error)
            return NextResponse.json({ message: "Unable to edit user details", data: null, error: [error] }, { status: 403 })
        }
    })

}