"use client"
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { BiSolidChevronDown } from 'react-icons/bi'
import { IoMdDoneAll } from 'react-icons/io'
import { PiBuildingsBold, PiStudentBold } from 'react-icons/pi'
const LoginBtn = () => {
    const [expanded, setExpanded] = useState(false);
    const parentRef = useRef();

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

    return (
        <div className='relative flex gap-2' ref={parentRef}>
            <Link href="/verify" className='flex gap-2 items-center justify-center bg-primary px-4 py-2 rounded-md text-sm text-white'>
                <IoMdDoneAll />
                Verify
            </Link>
            <button className='flex gap-1 items-center justify-center bg-secondary px-4 py-2 rounded-md text-sm text-white' onClick={() => setExpanded(prev => !prev)}>
                Login
                <BiSolidChevronDown />
            </button>

            {
                expanded ?
                    <div className="absolute top-10 z-10 bg-background shadow-md right-0 rounded-md p-1 flex flex-col gap-1 ">
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
                    </div>
                    :
                    null
            }
        </div>

    )
}

export default LoginBtn