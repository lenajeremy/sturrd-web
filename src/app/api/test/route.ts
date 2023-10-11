import { getSession } from "next-auth/react";


export async function GET(req: Request) {
    const session = await getSession()

    console.log(session)


    if (!session) return Response.json({ message: "Unauthorized" }, { status: 401 })

    return Response.json({ message: "Successful" }, { status: 200 })

}