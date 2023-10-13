'use client'
import * as React from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { UserTypes } from '@prisma/client'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { status, data: session } = useSession()
    const router = useRouter()
    const pathName = usePathname()


    React.useEffect(() => {

        if (status === 'authenticated') {
            if (pathName === '/auth/signin') {
                router.replace('/')
            } else if (pathName === '/setup-account' && session.user.userType !== UserTypes.BASE_USER) {
                router.replace('/')
            }
        } else if (status === 'unauthenticated') {
            router.replace('/auth/signin')
        }


        if (session?.user.userType === UserTypes.BASE_USER) {
            router.replace('/setup-account')
            return
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, pathName, session])

    return children
}

export default ProtectedRoute