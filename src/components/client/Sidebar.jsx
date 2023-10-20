"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathName = usePathname()
    const links = [
        {
            label: "Generate Certificate",
            href: "/orgnisation/dashboard/generate"
        },
        {
            label: "Add Template",
            href: "/orgnisation/dashboard/add"
        },
        // {
        //     label: "Generated Certificates",
        //     href: "/orgnisation/dashboard/generated"
        // }
    ]
    return (
        <aside className='h-full min-h-[calc(100dvh-5rem)] flex flex-col gap-1 w-full max-w-sm sticky top-[6rem] left-0 bg-transparent items-center border-white border-r-[1px] shadow-md '>
            {
                links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.href}
                        className={`w-full px-4 py-6 hover:shadow-lg transition-all hover:text-white ${link.href === pathName ? 'bg-primary text-white' : 'bg-white hover:bg-primary'}`}
                    >
                        {link.label}
                    </Link>
                ))
            }
        </aside>
    )
}

export default Sidebar