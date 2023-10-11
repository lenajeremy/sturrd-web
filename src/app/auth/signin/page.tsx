'use client'
import * as React from 'react'
import { signIn } from 'next-auth/react'
import SturrdLogo from '@/components/assets/logo'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'


type SignInFormValues = {
    email: string
    userType: 'student' | 'school administrator' | 'teacher' | 'parent'
}

function Signin() {

    const { toast } = useToast()
    const { register, handleSubmit, setValue } = useForm<SignInFormValues>()
    const [loading, setLoading] = React.useState<boolean>(false)

    const handleLogin: SubmitHandler<SignInFormValues> = async (values) => {
        setLoading(true)
        try {
            let res = await signIn('email', { email: values.email, callbackUrl: '/', redirect: false })

            if (res?.error) {
                toast({
                    title: "Error",
                    description: "Failed to send email login link. Please try again later.",
                })
            } else {
                toast({
                    title: "Email sent",
                    description: "A login link has been sent to your email address. Click to the link to log in to Sturrd",
                })
            }



        } catch (error) {
            // handleError()
        } finally {
            setLoading(false)
        }

    }

    return (
        <div className='flex h-screen'>
            <div className='w-[60%] h-full relative'>
                <Image
                    width={1000}
                    height={1000}
                    src={'/images/auth-bg-image.jpeg'}
                    alt="Woman talking in a class"
                    className='absolute h-full w-full -z-10 object-cover object-[-25 0px] brightness-50 contrast-125'
                />

                <div className='image-container p-8 bg-[#121212]/80 h-full w-full flex flex-col justify-between pb-20 text-white'>
                    <SturrdLogo color={"white"} />


                    <div>
                        <div className='space-y-4'>
                            <h1 className='w-2/3'>School Management Made Simple</h1>
                            <p className='text-[#CACACA] w-[60%] text-lg'>Simplify School Management with Sturrd. Streamline tasks, enhance communication, and enjoy a smarter school experience.</p>
                        </div>
                        <div className='flex gap-2 mt-8'>
                            <div className='w-[12px] h-[12px] rounded-full bg-[#606060] bg-opacity-90 cursor-pointer' />
                            <div className='w-[12px] h-[12px] rounded-full bg-[#2762F8] bg-opacity-100 cursor-pointer' />
                            <div className='w-[12px] h-[12px] rounded-full bg-[#606060] bg-opacity-90 cursor-pointer' />
                            <div className='w-[12px] h-[12px] rounded-full bg-[#606060] bg-opacity-90 cursor-pointer' />
                        </div>
                    </div>

                </div>
            </div>

            <div className='w-[40%] h-full flex flex-col justify-center gap-12 p-8'>
                <div className='space-y-3'>
                    <SturrdLogo size={84} color='black' />
                    <p className='w-3/4 text-muted-foreground'>Sturrd enhances education with streamlined school management for students, teachers, parents, and administrator.</p>
                </div>

                <form className='w-[80%] flex flex-col gap-3' onSubmit={handleSubmit(handleLogin)}>
                    <div className='space-y-1'>
                        <Label htmlFor='email'>Email</Label>
                        <Input placeholder='Enter your email address' type='email' {...register("email", { required: true })} />
                    </div>

                    <div className='space-y-1'>
                        <Label htmlFor='email'>What best describes you?</Label>
                        <Select className='w-full'
                            placeholder='Select an option'
                            renderLabel={(key) => key}
                            renderValue={key => key}
                            onChange={v => setValue('userType', v as SignInFormValues['userType'])}
                            options={[
                                "School Owner",
                                "School Administrator",
                                "Teacher/Educator",
                                "Parent",
                                "Student"
                            ]} />
                    </div>
                    <Button loading={loading} className='w-full mt-4'>Continue</Button>
                </form>

            </div>
        </div>
    )
}

export default Signin