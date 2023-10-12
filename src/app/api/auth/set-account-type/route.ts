import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { handleServerSession } from "@/utils/api";

const prisma = new PrismaClient()

export async function POST(request: NextRequest, response: NextResponse) {

    return handleServerSession(async (session) => {
        const userId = session.user.id
        const userType = (await request.json()).accountType

        console.log(userType, userId)

        const user = await prisma.user.update({
            where: { id: userId },
            data: { userType: userType }
        })

        return NextResponse.json({ message: "User updated successfully", data: user })
    })
}