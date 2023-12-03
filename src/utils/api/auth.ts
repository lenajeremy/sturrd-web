import { Session, getServerSession } from "next-auth";
import config from "@/auth";
import { NextResponse } from "next/server";

export async function handleServerSession(onAuthenticated: (session: Session) => void, onUnauthenticated?: () => void) {

    const session = await getServerSession(config)
    
    // await sleep(1)

    if (!session) {
        if (onUnauthenticated) {
            return onUnauthenticated()
        } else {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
        }
    }

    return onAuthenticated(session)
}

export async function sleep(seconds: number) {
    return new Promise(res => {
        setTimeout(res, seconds * 1000)
    })
}