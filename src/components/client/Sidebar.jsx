import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <aside className='h-full flex flex-col w-1/3 bg-primary items-center py-8 border-background border-r-2  '>

            <Link href={'/orgnisation/dashboard/generate'} className='bg-white px-4 py-2 rounded-md hover:shadow-lg transition-all hover:text-secondary'>Generate Certificate</Link>
        </aside>
    )
}

export default Sidebar