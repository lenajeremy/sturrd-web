'use client'
import * as React from 'react'
import { useSession } from 'next-auth/react'
import { redirect, usePathname } from 'next/navigation'
import { UserTypes } from '@prisma/client'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { status, data: session } = useSession()
    const pathName = usePathname()


    React.useEffect(() => {

        if (pathName === '/auth/signin' || pathName === '/setup-account') return

        if (status === "unauthenticated") {
            redirect("/auth/signin")
            return
        }

        if (session?.user.userType === UserTypes.BASE_USER) {
            redirect('/setup-account')
            return 
        }

    }, [ status, pathName, session ])

    return children
}

export default ProtectedRoute