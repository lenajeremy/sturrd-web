'use client'
import * as React from 'react'
import Image from 'next/image'
import ManageAccess from '@/components/access-manager'
import { useSession } from 'next-auth/react'

export default function DetailsPage() {
    const session = useSession()
    return (
        <ManageAccess allowedRoles={'*'} customRestriction={(session) => session?.user.userType === 'PARENT'}>

            <div> This is the details Page
                <pre>
                    {JSON.stringify(session, null, 3)}
                </pre>
                <Image src={session.data?.user.image || ""} width={200} height={200} alt='' />
            </div>
        </ManageAccess>
    )
}