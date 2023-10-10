"use client"
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'
import { BiSolidChevronDown } from 'react-icons/bi'
import { IoMdDoneAll } from 'react-icons/io'
import { PiBuildingsBold, PiStudentBold } from 'react-icons/pi'
import { usePathname, useRouter } from 'next/navigation';
import UserContext from '@/contexts/UserContext'
import { FiLogOut, FiUser } from 'react-icons/fi'
import { toast } from 'react-toastify'
import Image from 'next/image'
const LoginBtn = () => {

    const { user, setUser } = useContext(UserContext);
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
    const parentRef = useRef();
    const pathname = usePathname();

    const logout = async () => {
        try {
            const res = await fetch('/api/auth/logout');
            const data = await res.json();

            toast[data.type](data.message);
            if (data.success) {
                setUser({ id: null, email: null, userType: '' });
                router.replace('/');
            }

        } catch (error) {
            toast.error(error.message);
        }

    }

    useEffect(() => {

        const handleClick = (e) => {
            if (!parentRef?.current?.contains(e.target)) {
                setExpanded(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    })

    if ((pathname.includes('/login') || pathname.includes('/signup'))) return null;

    return (
        <div className='relative flex items-center' ref={parentRef}>
            <Link href="/verify" className='mr-2 flex gap-2 items-center justify-center bg-primary px-4 py-2 rounded-md text-sm text-white'>
                <IoMdDoneAll />
                Verify
            </Link>
            {
                user.id ?
                    <div className='p-0 rounded-md text-sm text-white' onClick={() => setExpanded(prev => !prev)}>
                        {
                            user?.logo ?
                                <Image src={user?.logo} width={100} height={100} className='rounded-full w-10 h-w-10 cursor-pointer' alt='user logo' />
                                :
                                <div className="w-10 h-10 rounded-full text-black grid place-items-center hover:bg-slate-300 cursor-pointer">
                                    <FiUser size={30} className='stroke-text' />
                                </div>
                        }
                    </div>
                    :
                    <button className='flex gap-1 items-center justify-center bg-secondary px-4 py-2 rounded-md text-sm text-white' onClick={() => setExpanded(prev => !prev)}>
                        Login
                        <BiSolidChevronDown />
                    </button>
            }

            {
                !user.id ?
                    expanded ?
                        <div className="absolute top-10 z-10 bg-background shadow-md md:left-1/2 md:-translate-x-1/2 rounded-md p-1 flex flex-col gap-1 ">
                            <Link href={'/student/login'} className='text-color px-4 py-2 flex gap-2 items-center hover:bg-primary hover:text-white rounded-md transition-all' onClick={() => setExpanded(false)}>
                                <div className="">
                                    <PiStudentBold size={15} />
                                </div>
                                Student
                            </Link>
                            <Link href={'/orgnisation/login'} className='text-color px-4 py-2 flex gap-2 items-center hover:bg-primary hover:text-white rounded-md transition-all' onClick={() => setExpanded(false)}>
                                <div className="">
                                    <PiBuildingsBold size={15} />
                                </div>
                                Orgnisation
                            </Link>
                        </div >
                        :
                        null
                    :
                    expanded ?
                        <div className="" >
                            <div className="absolute top-10 z-10 bg-background shadow-md md:left-1/2 md:-translate-x-1/2 rounded-md p-1 flex flex-col gap-1 ">
                                <Link href={'/orgnisation/dashboard'} className='text-color px-4 py-2 flex gap-2 items-center hover:bg-primary hover:text-white rounded-md transition-all' onClick={() => setExpanded(false)}>
                                    <div className="">
                                        <PiStudentBold size={15} />
                                    </div>
                                    Dashboard
                                </Link>
                                <Link href={'/'} className='text-color px-4 py-2 flex gap-2 items-center hover:bg-danger hover:text-white rounded-md transition-all' onClick={() => { setExpanded(false); logout() }}>
                                    <div className="">
                                        <FiLogOut size={15} />
                                    </div>
                                    Logout
                                </Link>
                            </div >
                        </div >
                        :
                        null
            }
        </div >

    )
}

export default LoginBtn