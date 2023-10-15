'use client'
import * as React from 'react'
import { Input } from '@/components/ui/input'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SchoolObject } from '@/types/z'
import { Select } from '@/components/ui/select'
import { useSetupSchoolMutation } from '@/requests'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'


const CreateSchoolPage = () => {
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

    const [setupSchool, { isLoading, isError }] = useSetupSchoolMutation()

    const onSubmit: SubmitHandler<SchoolObject> = async (values) => {
        try {
            const data = await setupSchool(values).unwrap()
            console.log(data)

            toast.success("School created successfully", {
                description: JSON.stringify(data, null, 3)
            })
        } catch (error) {
            toast.error("Error while creating school", {
                description: JSON.stringify(error, null, 3)
            })
        }
    }

    const { register, handleSubmit, setValue } = useForm<SchoolObject>()

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input  {...register('longName', { required: true })} />
                <Input  {...register('shortName', { required: true })} />
                <Input {...register('address', { required: true })} />
                <Input {...register('city', { required: true })} />
                <Select
                    options={['Lagos', "Los Angeles"]}
                    renderLabel={(e) => e}
                    renderValue={e => e}
                    onChange={(e) => setValue('state', e)}
                />
                <Button type='submit' loading={isLoading}>Submit</Button>
            </form>
        </div>
    )
}

export default CreateSchoolPage