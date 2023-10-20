"use client"
import Input from "@/components/client/Input";
import UserContext from "@/contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { ImSpinner } from "react-icons/im";
import { toast } from "react-toastify";


const LoginPage = () => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useContext(UserContext);

    const login = async (e) => {
        e.preventDefault();
        const email = e.currentTarget.email.value;
        const password = e.currentTarget.password.value;
        const rememberMe = e.currentTarget.rememberMe.checked;

        if (!email || !password) {
            return toast.error('Please fill all details.', { toastId: 'emptyFields' })
        }

        try {
            setLoading(true);
            const res = await fetch('/api/auth/student/login', {
                method: 'POST',
                body: JSON.stringify({ email, password, rememberMe })
            })

            const data = await res.json();
            console.log(data);

            if (data.success) {
                setUser({ id: data.user.id, name: data.user.name, userType: 'stu' })
                router.push('/student/dashboard');
            }
            toast[data.type](data.message);

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <section className='min-h-[calc(100dvh-5rem)] grid place-items-center'>
            <form onSubmit={login} className='w-11/12 md:w-4/5 md:max-w-md p-4 pt-5 bg-white shadow-xlrounded-md flex flex-col gap-2 border border-text rounded-md'>
                <h1 className='mb-2 text-2xl font-bold'>Welcome back</h1>
                <div className="flex flex-col gap-3">
                    <Input type="text" label="email" name='email' disabled={loading} autoFocus={true} autoComplete='email' />
                    <Input type="password" label="password" name='password' disabled={loading} autoComplete='password' />
                    <div className="flex gap-2 items-center">
                        <input type="checkbox" name="rememberMe" id="remember-me" className='w-4 h-4' />
                        <label htmlFor="remember-me" className='select-none cursor-pointer'>Remember me</label>
                    </div>
                    <Link href='/forgot' className='text-blue-700 ml-auto hover:underline'>forgot password?</Link>
                    <button type='submit' className='flex items-center gap-1 justify-center bg-primary backdrop-blur-md p-2 rounded-md hover:bg-primary-100 active:bg-primary-500 focus:bg-primary-100 transition-all text-white'>
                        {
                            loading ?
                                <>
                                    <ImSpinner className='animate-spin mt-1' />
                                    please wait...
                                </>
                                :
                                <>
                                    <FiLogIn />
                                    Log In
                                </>
                        }
                    </button>
                    <label className='flex gap-1 flex-wrap sm:justify-start justify-center'>
                        don&apos;t have an account ?
                        <Link href='/student/signup' className='text-blue-700 hover:underline'>create account</Link>
                    </label>
                </div>
            </form>
        </section>
    )
}

export default LoginPage