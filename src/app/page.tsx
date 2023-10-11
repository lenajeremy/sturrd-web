'use client'
import * as React from 'react'
import SturrdLogo from "@/components/assets/logo"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { redirect } from "next/navigation"

export default function Home() {

  const { data: session, status, update } = useSession()

  if (status === 'unauthenticated') redirect('/auth/signin')

  const [loading, setLoading] = React.useState<boolean>(false)

  async function editUserDetails() {
    setLoading(true)
    const res = await fetch('/api/user/update')
    const data = await res.json()
    console.log(data)
    setLoading(false)
  }

  return (
    <main>
      <header className="flex items-center justify-between p-4">
        <SturrdLogo size={84} color="black" />
        <div className="flex gap-2 items-center">
          <div>
            <p>{session?.user?.name}</p>
            <p className='text-sm text-muted-placeholder'>{session?.user?.email}</p>
          </div>
          <Image src = {session?.user?.image || "/auth-bg-image.jpeg"} alt = "User Image" width={48} height={48} className="rounded-full h-12 w-12" />
        </div>
      </header>
      {/* <pre>{JSON.stringify(session)}</pre> */}
      <button onClick={() => signOut()}>Signout</button> <br />
      <Button loading = {loading} onClick={() => editUserDetails()}>Edit Name</Button>
    </main>
  )
}
