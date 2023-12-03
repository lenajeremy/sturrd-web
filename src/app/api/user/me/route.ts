import { handleServerSession } from "@/utils/api"
import prisma from "@/utils/db"
import { NextResponse } from "next/server"

export const GET = () => {
    return handleServerSession(async (session) => {
        try {
            let user = await prisma.user.findFirstOrThrow({
                where: {
                    id: session.user.id
                }
            })

            let data: any = user

            if (user.userType === "STUDENT") {
                const student = await prisma.student.findUniqueOrThrow({
                    where: {
                        userId: session.user.id
                    },
                    include: {
                        school: {
                            select: {
                                longName: true,
                                shortName: true
                            }
                        }
                    }
                })

                data['studentId'] = student.id
                data['schoolId'] = student.schoolId
                data['schoolName'] = student.school.longName
                data['parentId'] = student.parentId

            } else if (user.userType === "TEACHER") {
                const teacher = await prisma.teacher.findFirstOrThrow({
                    where: {
                        staff: {
                            userId: session.user.id
                        },
                    },
                    include: {
                        staff: {
                            select: {
                                school: {
                                    select: {
                                        longName: true,
                                        id: true
                                    }
                                }
                            }
                        }
                    }
                })

                data['teacherId'] = teacher.id
                data['schoolId'] = teacher.staff.school.id
                data['schoolName'] = teacher.staff.school.longName
            } else if (user.userType === "SCHOOL_OWNER") {
                const schoolOwner = await prisma.schoolOwner.findUniqueOrThrow({
                    where: {
                        userId: session.user.id
                    },
                    include: {
                        school: {
                            select: {
                                id: true,
                                longName: true,
                            }
                        }
                    }
                })

                data['ownerId'] = schoolOwner.id
                data['hasUpdatedSchool'] = schoolOwner.hasUpdatedSchool
                data['schoolId'] = schoolOwner.school?.id
                data['schoolName'] = schoolOwner.school?.longName

            } else if (user.userType === 'SCHOOL_ADMIN') {
                const schoolAdmin = await prisma.schoolAdmin.findUniqueOrThrow({
                    where: {
                        userId: session.user.id
                    },
                    include: {
                        school: {
                            select: {
                                id: true,
                                longName: true,
                            }
                        }
                    }
                })

                data['adminId'] = schoolAdmin.id
                data['schoolId'] = schoolAdmin.school.id
                data['schoolName'] = schoolAdmin.school.longName
            } else if (user.userType === "PARENT") {
                const parent = await prisma.parent.findUniqueOrThrow({
                    where: {
                        userId: session.user.id
                    },
                    include: {
                        children: {
                            select: {
                                user: {
                                    select: {
                                        firstName: true,
                                        lastName: true,
                                    }
                                },
                                schoolId: true
                            }
                        }
                    }
                })

                data['wards'] = parent.children.map(child => ({ firstName: child.user.firstName, lastName: child.user.lastName, schoolId: child.schoolId }))
            }

            return NextResponse.json({ message: "Returned user details", errors: [], data })
        } catch (error) {
            return NextResponse.json({ message: "Error while retrieving user details", errors: [error], data: null })
        }

    })
}