import { Session } from "next-auth"

export function getUserFullName(user: Session['user']): string | null {
    if (user.firstName === null) return user.lastName
    if (user.lastName === null) return user.firstName

    return `${user.firstName} ${user.lastName}`
}