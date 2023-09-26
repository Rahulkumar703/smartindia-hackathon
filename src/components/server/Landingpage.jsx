import Image from 'next/image'
import React from 'react'

const Landingpage = () => {
    return (
        <>
            <div className='w-full py-4 bg-primary flex text-white flex-col'>
                <div className="max-w-6xl w-full flex gap-2 mx-auto items-center">
                    <div className="flex flex-col gap-2 ">
                        <h1 className='text-3xl font-bold capitalize'>certificate generation and validation system</h1>
                        <p className='max-w-[80%] text-center'>
                            User can store certificate in digital locker system other organization will validate certificate. Use opensource software and blockchain technology.
                            User can store certificate in digital locker system other organization will validate certificate. Use opensource software and blockchain technology.
                        </p>
                    </div>
                    <Image src='/certi2.svg' width={100} height={100} className='w-96 relative z-10 translate-y-5' />
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='fill-primary self -mt-24 relative -z-5'>
                <path fill="" fillOpacity="1" d="M0,288L80,250.7C160,213,320,139,480,128C640,117,800,171,960,192C1120,213,1280,203,1360,197.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
            </svg>
        </>
    )
}

export default Landingpage