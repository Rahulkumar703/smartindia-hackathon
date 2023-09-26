"use client"

import { useState } from "react";
import { FiLoader, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";

const VerifyPage = () => {


    const [loading, setLoading] = useState(false);
    const [certificateData, setCertificateData] = useState({
        orgnisationName: null,
        studentName: null
    });

    const search = async (e) => {
        e.preventDefault();
        const id = e.currentTarget.id.value;
        // console.log(id);
        if (!id) return toast.error('Please provide a certificate id.');
        try {
            const res = await fetch(`/api/certificate/${id}`);
            const data = await res.json();

            if (data.success)
                setCertificateData(data.certificate);

            toast[data.type](data.message);

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <section className='w-full'>
            <div className='bg-primary h-80 w-full py-4 flex relative z-5'>
                <form className="w-full max-w-6xl mx-auto flex items-center gap-3 translate-y-12 relative z-10" onSubmit={search}>
                    <input name="id" type="text" className="px-5 py-4 rounded-md flex-1" placeholder="enter certificate id to verify" />
                    <button type="submit" className="flex gap-2 items-center bg-secondary px-5 py-4 rounded-md text-white font-bold">
                        <FiSearch />
                        Search
                    </button>
                </form>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='fill-primary relative -z-5'>
                <path fill="" fillOpacity="1" d="M0,288L80,250.7C160,213,320,139,480,128C640,117,800,171,960,192C1120,213,1280,203,1360,197.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
            </svg>
            {
                loading ?
                    <>
                        <FiLoader />
                    </>
                    :
                    null
            }
        </section >
    )
}

export default VerifyPage