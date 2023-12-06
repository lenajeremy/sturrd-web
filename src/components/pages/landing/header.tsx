'use client'
import * as React from 'react'
import Link from 'next/link'
import { useLazyLoggedInUserDetailsQuery } from '@/requests'
import { useAppDispatch } from '@/hooks'
import { updateUserDetails } from '@/store/actions'
import SturrdLogo from '@/assets/logo'
import { signOut, useSession } from 'next-auth/react'
import { UserImage } from '@/components/shared'
import { Button } from '@/components/ui/button'

const Header = () => {

    const { status } = useSession()
    const dispatch = useAppDispatch()
    const [getUserDetails, { isLoading }] = useLazyLoggedInUserDetailsQuery()

    React.useEffect(() => {
        (async function () {
            const dat = await getUserDetails(undefined, true).unwrap()
            dispatch(updateUserDetails(dat.data))
        })()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    return (
        <header className='flex p-6 items-center justify-between'>
            <Link href='/'>
                <SturrdLogo />
            </Link>

            <div className='flex gap-6 items-center'>
                <Link href='pricing'>
                    Pricing
                </Link>

                <Link href='contact'>
                    Contact
                </Link>



                {
                    status == 'loading' ? (
                        <p>Loading...</p>
                    ) : status == 'authenticated' ? (
                        <button onClick={() => signOut({ redirect: false })}>
                            <UserImage />
                        </button>
                    ) : <a href='http://app.localhost:3000'>
                        <Button>Join</Button>
                    </a>
                }
            </div>
        </header>
    )
}

export default Header