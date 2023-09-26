"use client"
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { FiArrowLeft, FiLoader, FiSearch } from 'react-icons/fi';
import { toast } from 'react-toastify';


const VerifyCertificate = () => {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [certificateData, setCertificateData] = useState({
        orgnisationName: null,
        studentName: null
    });

    const verify = async (e) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/certificate/${id}`);
            const data = await res.json();

            if (data.success)
                setCertificateData(data.certificate);

            toast[data.type](data.message, { toastId: 'verifyCertificate' });

        } catch (error) {
            toast.error(error.message, { toastId: 'verifyCertificateError' });
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        verify();
    }, [])


    return (
        <>
            <section className='w-full'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='fill-primary relative -z-5'>
                    <path fill="" fillOpacity="1" d="M0,288L80,250.7C160,213,320,139,480,128C640,117,800,171,960,192C1120,213,1280,203,1360,197.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
                </svg>
            </section >
            <div>
                {
                    loading ?
                        <>
                            <FiLoader />
                        </>
                        :
                        null
                }
            </div>
        </>
    )
}

export default VerifyCertificate