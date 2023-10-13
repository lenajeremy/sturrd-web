import { getServerSession } from 'next-auth'
import config from '@/auth'
import prisma from '@/utils/db'
import { NextRequest, NextResponse } from 'next/server'



export async function GET(req: NextRequest, res: NextResponse) {

    const session = await getServerSession(config)

    const userName = req.nextUrl.searchParams.get('name')

    if (!userName) return NextResponse.json({ message: "Invalid Name Field - Please send a valid string" }, { status: 401 })

    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

    try {
        const res = await prisma.user.update({
            where: {
                email: session.user?.email || ""
            },
            data: {
                name: userName,
                image: "https://images.unsplash.com/photo-1696792995093-cf7e39a97349"
            }
        })

        return NextResponse.json({ data: res, message: "Successfully updated user" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ data: String(error), message: "Could not update user" }, { status: 400 })
    }
}