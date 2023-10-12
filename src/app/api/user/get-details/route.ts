import { NextResponse } from "next/server"

export const GET = () => {
    return NextResponse.json({"Hello World": "HELLO WORLD"})
}