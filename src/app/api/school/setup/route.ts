import { handleServerSession } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { ZodError } from 'zod'
import { schoolObject } from '@/types/z'
import { UserTypes } from "@prisma/client";



export async function POST(request: NextRequest) {

    return handleServerSession(async (session) => {

        const requestBody = (await request.json())

        if (session.user.userType !== UserTypes.SCHOOL_OWNER) {
            return Response.json({
                message: "You don't have permission to perform this action",
                data: null,
                errors: ["Permission Error"]
            }, { status: 403 }
            )
        }


        try {
            const data = schoolObject.parse(requestBody)

            const schoolOwner = await prisma.schoolOwner.findFirst({
                where: {
                    userId: session.user.id
                }
            })

            const school = await prisma.school.update({
                where: {
                    ownerId: schoolOwner?.id
                },
                data: {
                    longName: data.longName,
                    shortName: data.shortName,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    owner: {
                        update: {
                            hasUpdatedSchool: true
                        }
                    }
                }
            })

            return Response.json({ message: "School created successfully", data: school, errors: [] }, { status: 200 })
        } catch (error) {
            if (error instanceof ZodError) {
                return NextResponse.json({ message: "Invalid Request body", data: null, errors: ["Invalid request body"] }, { status: 400 })
            } else {
                return NextResponse.json({ message: "Error when updating school details - Unknown Error", data: null, errors: [error] }, { status: 403 })
            }
        }
    })
}