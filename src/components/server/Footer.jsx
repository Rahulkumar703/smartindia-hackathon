import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BiLink } from 'react-icons/bi'
import G20 from './G20'

const Footer = () => {
    return (
        <footer className='w-full bg-slate-800 text-white text-xs py-6 pt-10'>
            <div className="w-full max-w-6xl flex flex-col justify-between mx-auto gap-2">
                <div className="flex justify-between w-full">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-white">
                            {/* <Image src='/ashoka.png' alt='ashoka logo' width={50} height={50} className='w-6' /> */}
                            <div className="text-left flex gap-1 items-center justify-center">
                                <h1 className='text-md font-bold'>BlockCertify</h1>
                                <G20 className='w-16 h-auto' />
                                {/* <h2 className='text-xs text-slate-400'>Ministry of Education, Government of india</h2> */}
                            </div>
                        </div>
                        <p className="max-w-xs text-white text-xs">Digital Locker system other organization will validate certificate. Use opensource software and blockchain technology.</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link href="/">Home</Link>
                        <Link href="/">About</Link>
                        <Link href="/">Contact Us</Link>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link href="/">FAQs</Link>
                        <Link href="/">APIs</Link>
                        <Link href="/">Privacy policy</Link>
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-1 items-center">
                            Powerd by
                            <BiLink size={30} className='fill-primary' />
                            Blockchain
                        </div>
                        <p className='max-w-xs'>A distributed database or ledger shared among a computer network&apos;s nodes</p>
                    </div>
                </div>
                <div className="py-3 border border-transparent border-t-slate-600">
                    Copyright 2023 - NAD DIGILOCKER @ All rights reserved | NeGD | MeitY Government of India®
                </div>
            </div>
        </footer>
    )
}

export default Footer