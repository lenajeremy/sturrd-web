'use client'
import * as React from 'react'
import { useSession } from 'next-auth/react'
import { redirect, usePathname } from 'next/navigation'
import { UserTypes } from '@prisma/client'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { status, data: session } = useSession()
    const pathName = usePathname()

    if (pathName === '/auth/signin' || pathName === '/setup-account') return children

    if (status === 'unauthenticated') {
        console.log('this user is not authenticated', session, status)
        redirect('/auth/signin')
    }

    if (session?.user.userType === UserTypes.BASE_USER) {
        redirect('/setup-account')
    }

    return children
}

export default ProtectedRoute