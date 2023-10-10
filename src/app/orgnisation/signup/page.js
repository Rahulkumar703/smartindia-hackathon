
'use client'
import MultiStepForm from '@/components/client/MultiStepForm'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const SignupPage = () => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        logo: '',
        password: '',
        confirmPassword: '',
    })

    const signUp = async (e) => {
        e.preventDefault();

        const { name, email, address, phone, logo, password, confirmPassword } = form;

        if (!name || !address || !email || phone == 0 || !password || !logo) {
            return toast.error('please fill all details.', { toastId: 'emptyFields' })
        }
        if (password !== confirmPassword) {
            return toast.error('password not matched', { toastId: 'passwordNotMatched' })
        }

        try {
            setLoading(true);
            const signupForm = new FormData();

            for (const key in form) {
                if (key !== 'confirmPassword')
                    signupForm.append(key, form[key]);
            }

            const res = await fetch('/api/auth/orgnisation/signup', {
                method: 'POST',
                body: signupForm
            })

            const data = await res.json();
            if (data.success) {
                router.push('/orgnisation/login');
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
            <form onSubmit={signUp} className='w-full md:w-4/5 md:max-w-xl p-4 pt-5 bg-white shadow-xl rounded-md flex flex-col gap-2 border border-text'>
                <h1 className='mb-2 text-2xl font-bold'>Register Orgnisataion</h1>
                <div className="flex flex-col gap-3">
                    <MultiStepForm step={step} setStep={setStep} form={form} loading={loading} setForm={setForm} />
                    <label className='flex gap-1'>
                        already registered ?
                        <Link href='/orgnisation/login' className='text-blue-700 hover:underline'>login</Link>
                    </label>
                </div>
            </form>
        </section>
    )
}

export default SignupPage





