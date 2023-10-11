'use client'

import React from 'react'

export default function VerifyRequest(props: any) {
    return (
        <div className='h-screen w-full'>
            <p>{JSON.stringify(props, null, 3)}</p>
            
            <p>
                Email has been sent successfully was sent success
            </p>
        </div>
    )
}