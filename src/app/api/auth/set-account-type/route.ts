import { NextRequest, NextResponse } from "next/server";
import { handleServerSession } from "@/utils/api";
import prisma from "@/utils/db";
import { UserTypes } from "@prisma/client";


export async function POST(request: NextRequest, response: NextResponse) {

    return handleServerSession(async (session) => {
        const userId = session.user.id
        const userType = (await request.json()).accountType

        if (session.user.userType !== UserTypes.BASE_USER) {
            return NextResponse.json({
                message: "Account type has already been set",
                data: null,
                errors: ["Unable to change account type"]
            }, { status: 403 })
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { userType: userType }
        })

        return NextResponse.json({ message: "User updated successfully", data: user })
    })
}