import { UserTypes } from '@prisma/client'
import { Session } from 'next-auth'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import Lottie from 'lottie-react'
import loadingAnimation from '@/lotties/loading.json'

type ManageAccessProps = {
    children: React.ReactNode,
    allowedRoles: Array<UserTypes> | '*',
    restrictedRoles?: Array<UserTypes>,
    customRestriction?: (userSession: Session | null, currentPath: string) => boolean,
    whileValidatingComponent?: React.ReactNode,
    restrictedAccessComponent?: React.ReactNode,
    redirectOnRestrictionURL?: string
}

const allRoles = Object.values(UserTypes)

function getAllowedRoles(a: ManageAccessProps['allowedRoles'], r: ManageAccessProps['restrictedRoles'] = []): typeof allRoles {
    let allowedRoles: typeof allRoles = []

    if (a === '*') {
        for (let role of allRoles) {
            if (!r.includes(role)) {
                allowedRoles.push(role)
            }
        }
    } else {
        for (let role of a) {
            if (!r.includes(role)) {
                allowedRoles.push(role)
            }
        }
    }

    return allowedRoles
}

function ManageAccess(props: ManageAccessProps) {

    const { data: session, status } = useSession()
    const router = useRouter()
    const pathName = usePathname()

    const allowedRoles = React.useMemo(() => getAllowedRoles(props.allowedRoles, props.restrictedRoles), [props.allowedRoles, props.restrictedRoles])

    if (status === 'loading') {
        return props.whileValidatingComponent || (
            <div className='fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-foreground'>
                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
                    <Lottie animationData={loadingAnimation} loop={true} className='h-20 w-20' />
                    <p className='text-white -mt-4'>Loading...</p>
                </div>
            </div>
        )
    }

    if (props.customRestriction) {
        if (props.customRestriction(session, pathName)) {
            return props.children
        } else {
            if (props.redirectOnRestrictionURL) {
                router.replace(props.redirectOnRestrictionURL)
            } else {
                return props.restrictedAccessComponent || <p>You are not allowed to view this page</p>
            }
        }
    } else if (allowedRoles.includes(session?.user.userType as any)) {
        return props.children
    } else {
        if (props.redirectOnRestrictionURL) {
            router.replace(props.redirectOnRestrictionURL)
        } else {
            return props.restrictedAccessComponent || <p>You are not allowed to view this page</p>
        }
    }

    return props.whileValidatingComponent || (
        <div className='fixed top-0 left-0 right-0 bottom-0 w-screen h-screen bg-foreground'>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none'>
                <Lottie animationData={loadingAnimation} loop={true} className='h-20 w-20' />
                <p className='text-white -mt-4'>Loading...</p>
            </div>
        </div>
    )
}

export default ManageAccess