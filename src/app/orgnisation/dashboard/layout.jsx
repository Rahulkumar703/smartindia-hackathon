import Sidebar from '@/components/client/Sidebar'
import React from 'react'

const layout = ({ children }) => {
    return (
        <section className='flex w-full min-h-[calc(100dvh-5rem)]'>
            <Sidebar />
            <div className='h-full w-full'>
                {children}
            </div>
        </section>
    )
}

export default layout