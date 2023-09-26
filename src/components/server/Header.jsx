import Image from 'next/image'
import React from 'react'
import G20 from './G20'
import LoginBtn from '../client/LoginBtn'
import Link from 'next/link'

const Header = () => {
    return (
        <header className='w-full bg-gray-50/75 shadow-md flex items-center justify-center text-black sticky top-0 left-0 z-20 backdrop-blur-xl' >
            <div className="w-full max-w-6xl py-2 flex items-center justify-between">
                <Link href={'/'} className="flex items-center justify-center gap-2">
                    <Image src='/ashoka.png' alt='ashoka logo' width={50} height={50} className='w-8' />
                    <div className="text-left flex flex-col gap-0 justify-center">
                        <h1 className='text-xl leading-7 font-bold'>Centralized Ceritificates</h1>
                        <h2 className='text leading-4 text-slate-600'>Ministry of Education, Government of india</h2>
                    </div>
                    <G20 className='w-16 h-auto' />
                </Link>
                <LoginBtn />
            </div>
        </header>
    )
}

export default Header