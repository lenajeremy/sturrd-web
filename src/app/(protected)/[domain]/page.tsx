'use client'
import * as React from 'react'
import { useParams } from 'next/navigation'

export default function Page() {
    const params = useParams()
    return (
        <>
            <div>Domain</div>
            <pre>{JSON.stringify(params, null, 3)}</pre>
        </>
    )
}