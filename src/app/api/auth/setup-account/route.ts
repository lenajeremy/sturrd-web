import { NextRequest, NextResponse } from "next/server";
import { handleServerSession } from "@/utils/api";
import prisma from "@/utils/db";
import { UserTypes } from "@prisma/client";
import { getUserFullName } from "@/utils/shared";
import { setupAccountObject } from '@/types/z'


export async function POST(request: NextRequest, response: NextResponse) {

    return handleServerSession(async (session) => {
        const userId = session.user.id
        const requestBody = await request.json()

        try {

            const data = setupAccountObject.parse(requestBody)

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
                    lastName: data.lastName,
                    name: getUserFullName({ ...session.user, firstName: data.firstName || null, lastName: data.lastName || null })
                }
            })

            let isValid = false

            switch (data.userType) {
                case UserTypes.PARENT:
                    // creates a parent and connect to the signed in user
                    await prisma.parent.create({
                        data: {
                            user: {
                                connect: {
                                    id: user.id,
                                }
                            }
                        }
                    })

                    isValid = true
                    break;

                case UserTypes.SCHOOL_OWNER:
                    // creates a school and an admin for the school
                    await prisma.school.create({
                        data: {
                            longName: 'SCHOOL\'S NAME',
                            owner: {
                                create: {
                                    user: {
                                        connect: {
                                            id: session.user.id
                                        }
                                    }
                                }
                            }
                        }
                    })

                    isValid = true
                    break;

                default:
                    console.log('invalid user type')
                    isValid = false
            }

            if (isValid) {
                return NextResponse.json({ message: "User updated successfully", data: user, errors: [] })
            } else {
                return NextResponse.json({ message: "Unable to edit user details", data: null, errors: ["unable to edit user details"] }, { status: 403 })
            }
        } catch (error) {
            console.error(error)
            return NextResponse.json({ message: "Unable to edit user details", data: null, errors: [error] }, { status: 403 })
        }
    })

}