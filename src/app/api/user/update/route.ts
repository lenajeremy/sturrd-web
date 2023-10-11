import { getServerSession } from 'next-auth'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import config from '@/auth'

const prisma = new PrismaClient()


export async function GET(req: NextApiRequest, res: NextApiResponse) {

    console.log(req, res)
    const session = await getServerSession(req, res, config)

    if (!session) return Response.json({ message: "Unauthorized" }, { status: 401 })

    try {
        const res = await prisma.user.update({
            where: {
                email: "jeremiahlena13@gmail.com"
            },
            data: {
                name: "Jeremiah Lena",
                image: "https://images.unsplash.com/photo-1696792995093-cf7e39a97349"
            }
        })

        console.log(res)

        return Response.json({ data: res, message: "Successfully updated user" }, { status: 200 })
    } catch (error) {
        return Response.json({ data: String(error), message: "Could not update user" }, { status: 400 })
    }
}