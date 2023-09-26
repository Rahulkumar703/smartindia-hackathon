
'use client'
import Input from '@/components/client/Input'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { ImSpinner } from 'react-icons/im'
import { toast } from 'react-toastify'

const SignupPage = () => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const signUp = async (e) => {
        e.preventDefault();
        const firstName = e.currentTarget.firstName.value;
        const lastName = e.currentTarget.lastName.value;
        const email = e.currentTarget.email.value;
        const phone = e.currentTarget.phone.value;
        const password = e.currentTarget.password.value;
        const confirmPassword = e.currentTarget.confirmPassword.value;

        if (!firstName || !lastName || !email || phone == 0 || !password) {
            return toast.error('Please fill all details.', { toastId: 'emptyFields' })
        }
        if (password !== confirmPassword) {
            return toast.error('Password not matched', { toastId: 'passwordNotMatched' })
        }

        try {
            setLoading(true);
            const res = await fetch('/api/auth/student/signup', {
                method: 'POST',
                body: JSON.stringify({ firstName, lastName, email, phone, password })
            })

            const data = await res.json();
            if (data.success) {
                router.push('/student/login');
            }
            toast[data.type](data.message);

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section className='min-h-[calc(100dvh-5rem)] grid place-items-center'>
            <form onSubmit={signUp} className='w-11/12 md:w-4/5 md:max-w-max p-4 pt-5 bg-white shadow-xl rounded-md flex flex-col gap-2 border border-text'>
                <h1 className='mb-2 text-2xl font-bold'>Create Account</h1>
                <div className="flex flex-col gap-3">
                    <div className="flex gap-2">
                        <Input type="text" label="first name" name='firstName' disabled={loading} autoFocus={true} autoComplete='firstname' />
                        <Input type="text" label="last name" name='lastName' disabled={loading} autoComplete='lastname' />
                    </div>
                    <Input type="email" label="email" name='email' disabled={loading} autoComplete='email' />
                    <Input type="number" label="mobile no." name='phone' disabled={loading} autoComplete='phone' />
                    <div className="flex gap-2">
                        <Input type="password" label="password" name='password' disabled={loading} autoComplete='password' />
                        <Input type="password" label="confirm password" name='confirmPassword' disabled={loading} autoComplete='password' />
                    </div>
                    <button type='submit' className='flex items-center gap-2 justify-center bg-primary backdrop-blur-md p-2 rounded-md hover:bg-primary-100 active:bg-primary-500 focus:bg-primary-100 transition-all text-white'>
                        {
                            loading ?
                                <>
                                    <ImSpinner className='animate-spin mt-1' />
                                    please wait...
                                </>
                                :
                                <>
                                    <FiPlus />
                                    Create Account
                                </>
                        }
                    </button>

                    <label className='flex gap-1'>
                        already registered ?
                        <Link href='/student/login' className='text-blue-700 hover:underline'>login</Link>
                    </label>
                </div>
            </form>
        </section>
    )
}

export default SignupPage