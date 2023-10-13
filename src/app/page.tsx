'use client'
import * as React from 'react'
import SturrdLogo from "@/components/assets/logo"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { toast } from 'sonner'

export default function Home() {

  const { data: session, status } = useSession()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [name, setName] = React.useState<string>("")


  async function editUserDetails() {
    setLoading(true)
    const res = await fetch(`/api/user/update?name=${name}`)
    const data = await res.json()
    toast("Success", {
      description: JSON.stringify(data, null, 3)
    })
    setLoading(false)
  }

  return (
    <main>
      <header className="flex items-center justify-between p-4">
        <SturrdLogo size={84} color="black" />
        <div className="flex gap-2 items-center">
          <Image priority src={session?.user?.image || "/images/auth-bg-image.jpeg"} alt="User Image" width={48} height={48} className="rounded-full h-10 w-10" />
          <div>
            <div className='flex gap-1'>
              <p>{session?.user?.name}</p>
              <small className='text-[10px] p-1 rounded-full bg-green-500 text-white'>{session?.user.userType}</small>
            </div>
            <p className='text-sm text-muted-placeholder'>{session?.user?.email}</p>
            <button onClick={() => signOut()}>Signout</button> <br />
          </div>
        </div>
      </header>
      <div className='w-96'>
        <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        <Button className='w-full' loading={loading} onClick={() => editUserDetails()}>Edit Name</Button>
      </div>

      <Link href={'/details'}>Go to details</Link>
    </main>
  )
}
