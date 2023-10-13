import { handleServerSession } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

type SchoolBody = {
    longName: string
    shortName: string
    address: string
    city: string
    state: string
}

function verifyRequestBody(body: any): body is SchoolBody {
    if (!body.longName) return false
    if (!body.shortName) return false
    if (!body.address) return false
    if (!body.city) return false
    if (!body.state) return false

    return true
}

export async function POST(request: NextRequest, response: NextResponse) {

    return handleServerSession(async (session) => {

        const data = (await request.json())

        if (session.user.userType !== 'SCHOOL_ADMIN') {
            return Response.json({
                message: "You don't have permission to perform this action",
                data: null,
                errors: ["Permission Error"]
            }, { status: 403 }
            )
        }

        if (verifyRequestBody(data)) {
            try {
                const school = await prisma.school.create({
                    data: {
                        longName: data.longName,
                        shortName: data.shortName,
                        address: data.address,
                        city: data.city,
                        state: data.state,
                        admins: {
                            create: {
                                user: {
                                    connect: {
                                        id: session.user.id
                                    }
                                },
                                isSuperAdmin: true
                            }
                        },
                        superAdminId: session.user.id,
                    }
                })

                return Response.json({ message: "School created successfully", data: school, errors: [] }, { status: 200 })
            } catch (error) {
                return Response.json({
                    message: "School admins cannot create multiple schools",
                    data: null,
                    errors: ["School instance assigned to admin"]
                }, { status: 403 })
            }
        } else {
            return Response.json({ message: "Invalid Request body", data: null, errors: ["Invalid request body"] }, { status: 400 })
        }

    })
}