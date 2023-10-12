'use client'
import * as React from 'react'
import { toast } from 'sonner'
import { signIn, useSession } from 'next-auth/react'
import SturrdLogo from '@/components/assets/logo'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'


type SignInFormValues = {
    email: string
    acceptTerms: boolean
}

function Signin() {

    const { register, handleSubmit, setValue, watch } = useForm<SignInFormValues>()
    const [loading, setLoading] = React.useState<boolean>(false)
    const {status} = useSession()

    const acceptsTerms = watch('acceptTerms')

    const handleLogin: SubmitHandler<SignInFormValues> = async (values) => {

        setLoading(true)
        try {
            let res = await signIn('email', { email: values.email, callbackUrl: '/', redirect: false })

            if (res?.error) {
                toast.error("Error", {
                    description: "Failed to send email login link. Please try again later.",
                })
            } else {
                toast.success("Email sent", {
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
                            <h1 className='w-2/5'>School Management Made Simple</h1>
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
                    <div className='flex gap-2 items-start'>
                        <Checkbox onCheckedChange={(e) => setValue('acceptTerms', Boolean(e))} className='mt-1' id='acceptTerms' />
                        <Label htmlFor='acceptTerms' className='text-sm text-muted-placeholder text-[12px] w-[90%]'>By checking this box, you agree to receive email from Sturrd, accept our terms and conditions</Label>
                    </div>
                    <Button disabled={loading || !acceptsTerms} loading={loading} className='w-full mt-4'>Continue</Button>
                </form>

            </div>
        </div>
    )
}

export default Signin