'use client'
import * as React from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { UserTypes } from '@prisma/client'
import Lottie from 'lottie-react'
import loadingAnimation from '@/lotties/loading.json'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { status, data: session } = useSession()
    const [loading, setLoading] = React.useState(true)
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
        }

        setLoading(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, pathName, session])

    return (
        <div className='relative'>
            {children}
            {
                loading && (
                    <div className='fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-foreground'>
                        <Lottie animationData={loadingAnimation} loop={true} className='h-20 w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none' />
                        <p className='text-white'>Loading...</p>
                    </div>
                )
            }
        </div>
    )
}

export default ProtectedRoute