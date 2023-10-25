'use client'

import * as React from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { UserTypes } from "@prisma/client"
import Image from 'next/image'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSetupAccountDetailsMutation } from '@/requests'
import Link from 'next/link'



const accountTypes = [
    {
        key: "School Owner",
        value: UserTypes.SCHOOL_OWNER
    },
    {
        key: "Parent/Guardian",
        value: UserTypes.PARENT
    }
]



const AccountSetupPage = () => {

    const [setupAccount, { isLoading, isError }] = useSetupAccountDetailsMutation()

    const { register, handleSubmit, setValue } = useForm<{
        userType: typeof accountTypes[number]['value'],
        firstName?: string,
        lastName?: string,
    }>()


    const onSubmit: SubmitHandler<{
        userType: typeof accountTypes[number]['value'],
        firstName?: string,
        lastName?: string,
    }> = async (formValues) => {

        try {
            const res = await setupAccount(formValues).unwrap()
            toast.success(
                "Account type set successfully",
                { description: JSON.stringify(res, null, 3) }
            )


        } catch (error) {
            toast.error(
                "Error while setting account type",
                { description: JSON.stringify(error, null, 3) }
            )
        }
    }


    return (
        <div className='flex h-screen'>
            <div className='w-full md:w-2/5 p-8 md:p-12 grid place-items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex justify-center flex-col gap-8'>
                    <div>
                        <h3 className='font-semibold'>Welcome to Sturrd</h3>
                        <p className='text-muted-placeholder'>We&apos;d like to know more about you😊</p>
                    </div>

                    <div className='w-full md:w-[80%] flex flex-col gap-4'>
                        <div className='space-y-1'>
                            <Label>First Name</Label>
                            <Input placeholder='Enter your first name' {...register('firstName')} />
                        </div>

                        <div className='space-y-1'>
                            <Label>Last Name</Label>
                            <Input placeholder='Enter your last name' {...register('lastName')} />
                        </div>
                        <div className='space-y-1'>
                            <Label> Which of the following best describes you?</Label>

                            <Select
                                options={accountTypes}
                                renderLabel={(v) => v.key}
                                renderValue={(v) => v.value}
                                onChange={v => setValue('userType', v)}
                                className='w-full'
                            />
                        </div>
                    </div>
                    <Button loading={isLoading} type='submit'>Next</Button>
                </form>
            </div >
            <div className='hidden md:block w-3/5 relative p-12' style={{ backgroundImage: 'linear-gradient(180deg, #2D2D2D 34.99%, #575859 60.8%, #7C7C7C 100%)' }}>
                <Image src={'/images/dashboard 1.png'} width={700} height={500} alt='screenshot of sturrd dashboard' className='object-contain absolute right-0 top-1/2 -translate-y-1/2' />
            </div>

            <Link href='/'>Back to Main App</Link>
        </div >
    )
}

export default AccountSetupPage