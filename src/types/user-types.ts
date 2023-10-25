import { Session } from "next-auth"

export type BaseUserDetails = Omit<Session['user'], 'emailVerified'> & { emailVerified: string }

export type StudentDetails = BaseUserDetails & {
    schoolName: string,
    schoolId: string,
    className: string,
    classArm: string,
    parent: {
        name: string,
        id: string
    }
}

export function isStudent(user: BaseUserDetails): user is StudentDetails {
    return user.userType === 'STUDENT'
}

export type SchoolOwnerDetails = BaseUserDetails & {
    schoolName: string,
    schoolId: string,
    hasUpdatedSchool: boolean
}

export function isSchoolOwner(user: BaseUserDetails): user is SchoolOwnerDetails {
    return user.userType === 'SCHOOL_OWNER'
}

export type ParentDetails = BaseUserDetails

export function isParent(user: BaseUserDetails): user is ParentDetails {
    return user.userType === 'PARENT'
}

export type TeacherDetails = BaseUserDetails & {
    schoolId: string,
    schoolName: string,
    isClassHead: boolean,
}

export function isTeacher(user: BaseUserDetails): user is TeacherDetails {
    return user.userType === 'TEACHER'
}