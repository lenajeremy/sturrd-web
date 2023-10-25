'use client'
import * as React from 'react'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SchoolObject } from '@/types/z'
import { Select } from '@/components/ui/select'
import { useSetupSchoolMutation } from '@/requests'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import ManageAccess from '@/components/access-manager'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


const CreateSchoolPage = () => {

    const [setupSchool, { isLoading, isError }] = useSetupSchoolMutation()
    const router = useRouter()

    const onSubmit: SubmitHandler<SchoolObject> = async (values) => {
        try {
            const data = await setupSchool(values).unwrap()
            console.log(data)

            toast.success("School created successfully", {
                description: JSON.stringify(data, null, 3)
            })

            router.replace('/')
        } catch (error) {
            toast.error("Error while creating school", {
                description: JSON.stringify(error, null, 3)
            })
        }
    }

    const { register, handleSubmit, setValue } = useForm<SchoolObject>()

    return (
        <ManageAccess allowedRoles={['SCHOOL_OWNER', 'SCHOOL_ADMIN']} redirectOnRestrictionURL='/'>
            <div className='flex h-screen'>
                <div className='w-full md:w-2/5 p-8 md:p-12 grid place-items-center'>
                    <form onSubmit={handleSubmit(onSubmit)} className='w-full flex justify-center flex-col gap-8'>
                        <div>
                            <h3 className='font-semibold'>Hi admin</h3>
                            <p className='text-muted-placeholder'>You need to setup basic details about your school</p>
                        </div>

                        <div className='w-full md:w-[80%] flex flex-col gap-4'>
                            <div className='space-y-1'>
                                <Label>School Name</Label>
                                <Input placeholder='Enter the full name of your school' {...register('longName', { required: true })} />
                            </div>

                            <div className='space-y-1'>
                                <Label>Last Name</Label>
                                <Input placeholder='Enter the short name of your school (e.g. golet)' {...register('shortName', { required: true })} />
                            </div>

                            <div className='space-y-1'>
                                <Label>School Address</Label>
                                <Input placeholder='Enter school address' {...register('address', { required: true })} />
                            </div>

                            <div className='space-y-1'>
                                <Label>City</Label>
                                <Input placeholder='The city your school is located in' {...register('city')} />
                            </div>



                            <div className='space-y-1'>
                                <Label>State: </Label>
                                <Select
                                    className='w-full'
                                    options={['Lagos', "Los Angeles"]}
                                    renderLabel={(e) => e}
                                    renderValue={e => e}
                                    onChange={(e) => setValue('state', e)}
                                />
                            </div>
                        </div>
                        <Button className='w-4/5' loading={isLoading} type='submit'>Next</Button>
                    </form>
                </div >
                <div className='hidden md:block w-3/5 relative p-12' style={{ backgroundImage: 'linear-gradient(180deg, #2D2D2D 34.99%, #575859 60.8%, #7C7C7C 100%)' }}>
                    <Image src={'/images/dashboard 1.png'} width={700} height={500} alt='screenshot of sturrd dashboard' className='object-contain absolute right-0 top-1/2 -translate-y-1/2' />
                </div>
            </div>
        </ManageAccess>
    )
}

export default CreateSchoolPage