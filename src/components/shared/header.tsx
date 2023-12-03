'use client'
import * as React from 'react'
import Image from 'next/image'
import { useAppSelector } from '@/hooks'
import Link from 'next/link'
import { UserImage } from '.'

function Header() {
    const user = useAppSelector(store => store.user)
    return (
        <header className="flex items-center justify-between px-6 py-4 mb-6 border-b">
            <div className="flex gap-4 items-center">
                <Image
                    src='/images/school-logo.avif'
                    alt="University of Lagos' Logo"
                    width={100} height={100}
                    className="w-10 h-10 rounded-full"
                />
                <div className='relative flex items-center gap-1'>
                    <p className='font-medium text-xl'>{user.schoolName}</p>
                    <span className='bg-primary text-white text-[10px] h-fit rounded-md p-1 font-semibold'>FREE</span>
                </div>
            </div>

            <Link href='/details'>
                <div className='flex gap-3 items-center'>
                    <UserImage />
                    <div className='hidden lg:block'>
                        <p className='text-sm'>{user.firstName} {user.lastName}</p>
                        <p className='text-xs text-muted-foreground'>{user.email}</p>
                    </div>
                </div>
            </Link>
        </header>
    )
}

export default Header