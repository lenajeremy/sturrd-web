'use client'
import { signIn } from "next-auth/react"

const SigninButton = () => {
    return (
        <button className="text-white bg-slate-900 rounded-md px-6 py-3 text-center" onClick={() => signIn('email', { email: "jeremiahlena13@gmail.com" })}>Sign In</button>
    )
}

export default SigninButton