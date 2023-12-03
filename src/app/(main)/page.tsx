'use client'
import * as React from 'react'
import SturrdLogo from "@/components/assets/logo"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { toast } from 'sonner'
import ManageAccess from '@/components/access-manager'
import { useAppSelector } from '@/hooks'
import { Sidebar } from '@/components/shared'

export default function Home() {

  const user = useAppSelector(store => store.user)
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
    <ManageAccess allowedRoles="*" restrictedRoles={['BASE_USER']} redirectOnRestrictionURL='/setup-account'>
      <div className='p-4 space-y-8'>
        <div className="flex gap-2 justify-between items-center">
          <Image priority src={user.image || "/images/auth-bg-image.jpeg"} alt="User Image" width={32} height={32} className="rounded-full h-8 w-8" />
          
        </div>

        <div className='space-y-4'>
          <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} className='w-full' />
          <Button className='w-full' loading={loading} onClick={() => editUserDetails()}>Edit Name</Button>
        </div>

        <Button variant={'secondary'} size={'sm'} onClick={() => signOut({ redirect: true })}>Signout</Button> <br />
      </div>

      <Link href='/setup-account'>Set up Account</Link>
    </ManageAccess>
  )
}
