import * as React from 'react'
import prisma from '@/utils/db'
import { notFound } from 'next/navigation'

export default async function Layout(props: { children: React.ReactNode, params: { domain: string } }) {

    let school;

    if (props.params.domain !== 'app') {
        const _school = await prisma.school.findFirst({
            where: {
                shortName: props.params.domain
            }
        })

        school = _school

        !_school && notFound()
    }


    return (
        <div>
            <pre>{JSON.stringify(school, null, 3)}</pre>
            {props.children}
        </div>
    )
}
