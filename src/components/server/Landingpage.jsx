import Image from 'next/image'
import React from 'react'

const Landingpage = () => {
    return (
        <>
            <div className='w-full py-4 bg-primary flex text-white flex-col relative -z-[11]'>
                <div className="max-w-6xl w-full flex gap-2 mx-auto items-center">
                    <div className="flex flex-col gap-2 ">
                        <h1 className='text-3xl font-bold capitalize'>certificate generation and validation system</h1>
                        <p className='max-w-[80%] text-center'>
                            Revolutionize credential management with our blockchain-powered platform. Secure, transparent, and user-centric. Elevate trust in digital certificates today.
                        </p>
                    </div>
                    <Image src='/certificate.svg' width={100} height={100} className='w-96 relative z-10 translate-y-5' alt='certificate verification' />
                </div>
            </div>
            <svg id="wave" className="-z-10 rotate-180 transition-0 -mt-10 relative md:-mb-28" viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                        <stop stopColor="rgba(0, 153, 255, 1)" offset="0%"></stop>
                        <stop stopColor="rgba(0, 46.796, 255, 1)" offset="100%"></stop>
                    </linearGradient>
                </defs>
                <path className="translate-x-0 translate-y-0 opacity-100 " fill="url(#sw-gradient-0)" d="M0,294L80,318.5C160,343,320,392,480,375.7C640,359,800,278,960,253.2C1120,229,1280,261,1440,253.2C1600,245,1760,196,1920,163.3C2080,131,2240,114,2400,147C2560,180,2720,261,2880,261.3C3040,261,3200,180,3360,187.8C3520,196,3680,294,3840,277.7C4000,261,4160,131,4320,73.5C4480,16,4640,33,4800,65.3C4960,98,5120,147,5280,147C5440,147,5600,98,5760,114.3C5920,131,6080,212,6240,220.5C6400,229,6560,163,6720,147C6880,131,7040,163,7200,147C7360,131,7520,65,7680,98C7840,131,8000,261,8160,334.8C8320,408,8480,425,8640,359.3C8800,294,8960,147,9120,138.8C9280,131,9440,261,9600,294C9760,327,9920,261,10080,253.2C10240,245,10400,294,10560,269.5C10720,245,10880,147,11040,138.8C11200,131,11360,212,11440,253.2L11520,294L11520,490L11440,490C11360,490,11200,490,11040,490C10880,490,10720,490,10560,490C10400,490,10240,490,10080,490C9920,490,9760,490,9600,490C9440,490,9280,490,9120,490C8960,490,8800,490,8640,490C8480,490,8320,490,8160,490C8000,490,7840,490,7680,490C7520,490,7360,490,7200,490C7040,490,6880,490,6720,490C6560,490,6400,490,6240,490C6080,490,5920,490,5760,490C5600,490,5440,490,5280,490C5120,490,4960,490,4800,490C4640,490,4480,490,4320,490C4160,490,4000,490,3840,490C3680,490,3520,490,3360,490C3200,490,3040,490,2880,490C2720,490,2560,490,2400,490C2240,490,2080,490,1920,490C1760,490,1600,490,1440,490C1280,490,1120,490,960,490C800,490,640,490,480,490C320,490,160,490,80,490L0,490Z"></path>
            </svg>
        </>
    )
}

export default Landingpage