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



const accountTypes = [
    {
        key: "School Owner / Administrator",
        value: UserTypes.SCHOOL_ADMIN
    },
    {
        key: "Student",
        value: UserTypes.STUDENT
    },
    {
        key: "Parent/Guardian",
        value: UserTypes.PARENT
    }
]



const AccountSetupPage = () => {

    const [currentStage, setCurrentStage] = React.useState(0)
    const [loading, setLoading] = React.useState<boolean>(false)
    const { register, handleSubmit, setValue } = useForm<{
        userType?: UserTypes,
        firstName?: string,
        lastName?: string,
    }>()


    const onSubmit: SubmitHandler<{
        userType?: UserTypes,
        firstName?: string,
        lastName?: string,
    }> = async (formValues) => {

        console.log(formValues)
        setLoading(true)
        try {
            const res = await fetch('/api/auth/setup-account', { method: "POST", body: JSON.stringify(formValues) })
            const data = await res.json()

            toast.success(
                "Account type set successfully",
                { description: JSON.stringify(data, null, 3) }
            )

            setCurrentStage(1)
        } catch (error) {
            console.log(error)
            toast.error(
                "Error while setting account type",
                { description: JSON.stringify(error, null, 3) }
            )
        } finally {
            setLoading(false)
        }
    }

    // const setupSchool = async () => {
    //     setLoading(true)

    //     const res = await fetch('/api/school/setup', {
    //         method: "POST", body: JSON.stringify({
    //             shortName: "golet",
    //             longName: "God's Elect Academy",
    //             address: "17, Lubokun street, Ikola Odunsi, Ipaja",
    //             city: "Alimosho",
    //             state: "Lagos"
    //         })
    //     })

    //     const data = await res.json()
    //     console.log(data)
    //     setLoading(false)
    // }


    return (
        <div className='flex h-screen'>
            <div className='w-full md:w-2/5 p-8 md:p-12 grid place-items-center'>
                <form onSubmit={handleSubmit(onSubmit)} className='w-full flex justify-center flex-col gap-8'>
                    <div>
                        <h3 className='font-semibold'>Welcome to Sturrd</h3>
                        <p className='text-muted-placeholder'>We&apos;d like to know more about you😊</p>
                    </div>

                    {
                        currentStage === 0 && (
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
                        )
                    }

                    {
                        currentStage === 1 && (
                            <div className='w-96'>
                                <h1>Stage 2</h1>
                            </div>
                        )
                    }

                    <div className='flex justify-between items-center md:w-[80%] mt-8'>
                        <Button type='button' disabled={currentStage === 0} variant={'ghost'} loading={loading} onClick={() => { }}>Prev</Button>
                        <Button loading={loading} type='submit'>Next</Button>
                    </div>
                </form>
            </div>
            <div className='hidden md:block w-3/5 relative p-12' style={{ backgroundImage: 'linear-gradient(180deg, #2D2D2D 34.99%, #575859 60.8%, #7C7C7C 100%)' }}>
                <p className='text-center tracking-[0.3rem] text-background font-medium'>STEP {currentStage + 1} of 5</p>
                <Image src={'/images/dashboard 1.png'} width={700} height={500} alt='screenshot of sturrd dashboard' className='object-contain absolute right-0 top-1/2 -translate-y-1/2' />
            </div>
        </div >)
}

export default AccountSetupPage