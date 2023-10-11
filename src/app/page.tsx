'use client'
import * as React from 'react'
import SturrdLogo from "@/components/assets/logo"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Input } from '@/components/ui/input'

export default function Home() {

  const { data: session, status, update } = useSession()

  if (status === 'unauthenticated') redirect('/auth/signin')

  const [loading, setLoading] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>("")

  async function editUserDetails() {
    setLoading(true)
    const res = await fetch(`/api/user/update?name=${name}`)
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
          <Image src={session?.user?.image || "/images/auth-bg-image.jpeg"} alt="User Image" width={48} height={48} className="rounded-full h-12 w-12" />
        </div>
      </header>
      {/* <pre>{JSON.stringify(session)}</pre> */}
      <button onClick={() => signOut()}>Signout</button> <br />
      <div className='w-96'>
        <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button className='w-full' loading={loading} onClick={() => editUserDetails()}>Edit Name</Button>
      </div>
    </main>
  )
}
