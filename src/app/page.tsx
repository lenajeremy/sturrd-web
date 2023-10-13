'use client'
import * as React from 'react'
import SturrdLogo from "@/components/assets/logo"
import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { toast } from 'sonner'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

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
      <header className="flex items-center justify-between p-4 mb-6 border-b">
        <SturrdLogo size={60} color="black" />
        <HamburgerMenuIcon width={24} height={24} />
      </header>
      <div className='p-4 space-y-8'>
        <div className="flex gap-2 justify-between items-center">
          <Image priority src={session?.user?.image || "/images/auth-bg-image.jpeg"} alt="User Image" width={32} height={32} className="rounded-full h-8 w-8" />
          <div>
            <div className='flex gap-1'>
              <Link href={'/details'}>
                <p>{session?.user?.name}</p>
              </Link>
              <small className='text-[10px] p-1 rounded-full bg-green-500 text-white'>{session?.user.userType}</small>
            </div>
            <p className='text-sm text-muted-placeholder'>{session?.user?.email}</p>
          </div>
        </div>

        <div className='space-y-4'>
          <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className='w-full' />
          <Button className='w-full' loading={loading} onClick={() => editUserDetails()}>Edit Name</Button>
        </div>

        <Button variant={'secondary'} size={'sm'} onClick={() => signOut()}>Signout</Button> <br />
      </div>
    </main >
  )
}
