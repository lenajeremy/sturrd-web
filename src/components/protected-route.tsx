'use client'
import * as React from 'react'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useAppSession } from '@/hooks'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const pathName = usePathname()
    console.log(pathName)

    const { status, data: session } = useAppSession({
        onUnauthenticated: () => {
            console.log('you are not authenticated')
            pathName !== '/auth/signin' ? router.replace('/auth/signin') : null
        },
        required: true
    })

    // const loading = useAppSelector(store => store.pageLoader)
    const router = useRouter()
    // const pathName = usePathname()

    // React.useEffect(() => {

        // if (status === 'authenticated') {
        //     if (pathName === '/auth/signin') {
        //         router.replace('/')
        //     } else if (pathName === '/setup-account' && session.user.userType !== UserTypes.BASE_USER) {
        //         router.replace('/')
        //     }
        // } else if (status === 'unauthenticated') {
        //     router.replace('/auth/signin')
        // }


        // if (session?.user.userType === UserTypes.BASE_USER) {
        //     router.replace('/setup-account')
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [status, pathName, session])

    return (
        <div className='relative'>
            {children}
            {/* {
                loading ? (
                    <div className='fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-foreground'>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
                            <Lottie animationData={loadingAnimation} loop={true} className='h-20 w-20' />
                            <p className='text-white -mt-4'>Loading...</p>
                        </div>
                    </div>
                ) : null
            } */}
        </div>
    )
}

export default ProtectedRoute