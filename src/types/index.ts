import { SessionContextValue } from "next-auth/react"
import { Session } from "next-auth"

export type AppSessionType = {
    data: null | Session,
    status: SessionContextValue['status']
}