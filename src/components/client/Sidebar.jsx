import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <aside className='h-full min-h-[calc(100dvh-5rem)] flex flex-col w-full max-w-sm sticky top-[6rem] left-0 bg-transparent items-center border-white border-r-[1px] shadow-md '>
            <Link href={'/orgnisation/dashboard/generate'} className='w-full px-4 py-6 hover:shadow-lg hover:bg-primary bg-white transition-all hover:text-white'>Generate Certificate</Link>
        </aside>
    )
}

export default Sidebar