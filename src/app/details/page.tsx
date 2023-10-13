import * as React from 'react'
import { getServerSession } from 'next-auth'
import config from '@/auth'
import Image from 'next/image'

export default async function DetailsPage() {
    const session = await getServerSession(config)
    return (

        <div> This is the details Page
            <pre>
                {JSON.stringify(session, null, 3)}
            </pre>
            <Image src={session?.user.image || ""} width={200} height={200} alt='' />
        </div>
    )
}