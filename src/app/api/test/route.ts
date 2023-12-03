import { getSession } from "next-auth/react";


export async function GET(req: Request) {
    const headers: Headers = new Headers()
    headers.set('Max-Age', "100000")

    return Response.json({ message: "Successful" }, { status: 200, headers })

}