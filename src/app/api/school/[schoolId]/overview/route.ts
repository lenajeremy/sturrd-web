import { handleServerSession } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { z, ZodError } from 'zod'

const getSchoolParamsShape = z.object({
    schoolId: z.string().describe("SchoolID")
})

export async function GET(request: NextRequest, { params }: { params: z.infer<typeof getSchoolParamsShape> }) {
    return handleServerSession(async session => {
        try {
            getSchoolParamsShape.parse(params) // throws an error if invalid

            const school = await prisma.school.findUniqueOrThrow({
                where: {
                    id: params.schoolId
                },
                select: {
                    id: true,
                    longName: true,
                    shortName: true,
                    address: true,
                    city: true,
                    state: true,
                }
            })

            return NextResponse.json({
                data: school,
                message: "Successfully retrieved school details",
                errors: []
            })

        } catch (error) {
            if (error instanceof ZodError) {
                return NextResponse.json({
                    data: null,
                    message: "Invalid school ID",
                    errors: error.errors
                }, { status: 400 })
            } else {
                return NextResponse.json({
                    data: null,
                    message: "Unable to retrive school details",
                    errors: [(error as any).message]
                }, { status: 404 })
            }
        }
    })
}