"use client"
import Input from '@/components/client/Input';
import RenderPDF from '@/components/client/RenderPDF';
import UserContext from '@/contexts/UserContext';
import { renderCertificateTemplate } from '@/lib/certificates';
import React, { useContext, useState } from 'react'
import { FiDownload, FiUploadCloud } from 'react-icons/fi'
import { toast } from 'react-toastify';
import useSWR from 'swr';


const fetchTemplate = (url) => fetch(url).then((res) => res.json());

const GenerateCertificates = ({ params }) => {

    const { user } = useContext(UserContext);

    const [url, setUrl] = useState(null);

    const { data, error: templateError } = useSWR(
        user.id ? `/api/certificate/templates/${user.id}/${params.id}` : null,
        fetchTemplate
    );


    const generate = async (e) => {
        e.preventDefault();
        let isFilled = true;
        const formData = data.template.fields.reduce((acc, field) => {
            const value = e.currentTarget[field.name].value;
            if (!value) {
                toast.error('Please fill all details', { toastId: "emptyField" });
                isFilled = false;
            }
            acc[field.name] = value;
            return acc;
        }, {});

        if (!isFilled) return;


        data.template.fields.forEach(field => {
            if (formData.hasOwnProperty(field.name)) {
                field.value = formData[field.name];
            }
        });

        try {

            const res = await fetch('/api/certificate', {
                method: 'POST',
                body: JSON.stringify({ formData, templateId: data.template._id, orgnisationId: user.id }),
            })
            const resData = await res.json();

            if (resData.success) {
                const url = await renderCertificateTemplate(data.template);
                setUrl(url);
            }
            else toast[data.type](data.message);


        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    }

    return (
        <section className='w-full'>
            <div className='bg-primary w-full flex relative z-5 px-8'>
                <form className="w-full mx-auto flex flex-col gap-3 translate-y-12 relative z-10" onSubmit={generate}>
                    <div className="grid grid-cols-2 gap-2 text-white">
                        {
                            data && data.template ?
                                data.template.fields.map((field, index) => {
                                    return (
                                        <Input key={index} className="text-color" type="text" label={field.name} name={field.name} disabled={!data} autoComplete={field.name} />
                                    )
                                })
                                :
                                <p>Loading...</p>
                        }
                    </div>
                    <button type="submit" className="flex gap-2 items-center justify-center bg-secondary p-3 rounded-md text-white font-bold">
                        <div className="">
                            <FiUploadCloud size={20} />
                        </div>
                        Generate Certificate
                    </button>
                </form>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className='fill-primary relative -z-5'>
                <path fill="" fillOpacity="1" d="M0,288L80,250.7C160,213,320,139,480,128C640,117,800,171,960,192C1120,213,1280,203,1360,197.3L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
            </svg>
            <div className="p-2 flex flex-col gap-3">
                {
                    url
                    &&
                    <a href={url} download={'Block_Certify.pdf'} className="gap-2 w-10/12 mx-auto rounded-md text-white font-bold p-3 flex items-center justify-center bg-primary transition-all hover:shadow-xl">
                        <div className="">
                            <FiDownload size={20} />
                        </div>
                        Download Certificate
                    </a>
                }
                <RenderPDF url={url} className={'rounded'} />
            </div>
        </section>
    )
}

export default GenerateCertificates