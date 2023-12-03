'use client'
import * as React from 'react'
import SturrdLogo from '@/assets/logo'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { 
    HomeIcon, PersonIcon, GearIcon, 
    PilcrowIcon, CardStackPlusIcon, 
    SpeakerLoudIcon, CalendarIcon, 
    CodeIcon, CopyIcon, TextAlignCenterIcon
} from '@radix-ui/react-icons'
import Link from 'next/link'
import { useAppSelector } from '@/hooks'


const Sidebar = () => {

    const { firstName, lastName, userType } = useAppSelector(store => store.user)

    return (
        <div className='fixed h-full top-0 w-[300px] p-8 bg-foreground text-background text-[15px] hidden lg:block'>
            <SturrdLogo size={80} color="white" />

            <div className='flex flex-col h-full pt-[100px] justify-between pb-[20px]'>
                <div className='flex flex-col gap-5'>
                    <Link href={'/'} className='flex gap-3 items-center' >
                        <HomeIcon width={20} height={20} />
                        <p>Dashboard</p>
                    </Link>

                    <Link href={'/'} className='flex gap-3 items-center' >
                        <CopyIcon width={20} height={20} />
                        <p>Teachers</p>
                    </Link>

                    <Link href={'/'} className='flex gap-3 items-center' >
                        <CodeIcon width={20} height={20} />
                        <p>Courses</p>
                    </Link>

                    <Link href={'/'} className='flex gap-3 items-center' >
                        <TextAlignCenterIcon width={20} height={20} />
                        <p>Transactions</p>
                    </Link>

                    <Link href={'/'} className='flex gap-3 items-center' >
                        <PersonIcon width={20} height={20} />
                        <p>Student Management</p>
                    </Link>

                    <Link href={'/'} className='flex gap-3 items-center' >
                        <CardStackPlusIcon width={20} height={20} />
                        <p>Finances</p>
                    </Link>

                    <Link href={'/'} className='flex gap-3 items-center' >
                        <GearIcon width={20} height={20} />
                        <p>Grades / Results</p>
                    </Link>

                    <Link href={'/'} className='flex gap-3 items-center' >
                        <HomeIcon width={20} height={20} />
                        <p>Attendance Management</p>
                    </Link>

                    <Link href={'/'} className='flex gap-3 items-center' >
                        <PilcrowIcon width={20} height={20} />
                        <p>Guardian / Wards</p>
                    </Link>

                    <Link href={'/'} className='flex gap-3 items-center' >
                        <SpeakerLoudIcon width={20} height={20} />
                        <p>Announcements</p>
                    </Link>

                    <Link href={'/'} className='flex gap-3 items-center' >
                        <CalendarIcon width={20} height={20} />
                        <p>School Calendar</p>
                    </Link>
                </div>

                <div className='flex gap-4 items-center'>
                    <Avatar className='w-8 h-8'>
                        <AvatarImage src='/images/auth-bg-image.jpeg' />
                        <AvatarFallback>JL</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='text-sm'>{firstName} {lastName}</p>
                        <p className='text-xs text-muted opacity-60'>{userType}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar