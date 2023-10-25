'use client'
import * as React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useLazyLoggedInUserDetailsQuery } from '@/requests'
import { useAppDispatch } from '@/hooks'
import { updateUserDetails } from '@/store/actions'
import Lottie from 'lottie-react'
import loadingAnimation from '@/lotties/loading.json'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const { status } = useSession({
        onUnauthenticated: () => {
            router.replace('/auth/signin')
        },
        required: true
    })

    const dispatch = useAppDispatch()

    const [ getUserDetails, { isLoading } ] = useLazyLoggedInUserDetailsQuery()

    React.useEffect(() => {
        (async function() {
            const dat = await getUserDetails(null, true).unwrap()
            dispatch(updateUserDetails(dat.data))
        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    const router = useRouter()

    return (
        <div className='relative'>
            {children}
            {
                isLoading ? (
                    <div className='fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-foreground'>
                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
                            <Lottie animationData={loadingAnimation} loop={true} className='h-20 w-20' />
                            <p className='text-white -mt-4'>Loading...</p>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default ProtectedRoute