'use client'
import * as React from 'react'
import Image from 'next/image'
import ManageAccess from '@/components/access-manager'
import { useSession } from 'next-auth/react'
import { useAppSelector } from '@/hooks'

export default function DetailsPage() {
    const user = useAppSelector(store => store.user)

    return (
        <ManageAccess allowedRoles={'*'}>
            <div> This is the details Page

                <Image src={user.image || ""} width={200} height={200} alt='' />
                <pre>{JSON.stringify(user, null, 3)}</pre>
            </div>
        </ManageAccess>
    )
}