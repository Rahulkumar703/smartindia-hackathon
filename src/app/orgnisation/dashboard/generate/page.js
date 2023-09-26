"use client"
import Input from '@/components/client/Input';
import UserContext from '@/contexts/UserContext';
import { PDFDocument, StandardFonts, fontkit, rgb } from 'pdf-lib';
import React, { useContext, useState } from 'react'
import { FiUploadCloud } from 'react-icons/fi'
import { toast } from 'react-toastify';

const GenerateCertificates = () => {

    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);


    const downloadCertificate = async (studentName, orgnisationName, digitalSign) => {
        const res = await fetch('/certificateTemplate.pdf')
        const pdfBuffer = await res.arrayBuffer();

        let pdfDoc = await PDFDocument.load(pdfBuffer)

        pdfDoc.registerFontkit(fontkit)

        const font = pdfDoc.embedStandardFont(StandardFonts.CourierBold);

        const pages = pdfDoc.getPages();
        const pageWidth = pages[0].getWidth();

        const stuNameWidth = font.widthOfTextAtSize(studentName, 100);
        pages[0].drawText(studentName, {
            x: (pageWidth / 2) - stuNameWidth / 2,
            y: 1000,
            size: 100,
            font: font,
            color: rgb(0, 0, 0),
            opacity: 1
        })

        const orgNameWidth = font.widthOfTextAtSize(orgnisationName, 70);
        pages[0].drawText(orgnisationName, {
            x: (pageWidth / 2) - orgNameWidth / 2,
            y: 740,
            size: 70,
            font: font,
            color: rgb(0, 0, 0),
            opacity: .8
        })
        pages[0].drawText(digitalSign, {
            x: 70,
            y: 262,
            size: 40,
            font: font,
            color: rgb(0, 0, 0),
            opacity: .5
        })
        pages[0].drawText('Verified by', {
            x: 760,
            y: 250,
            size: 40,
            font: font,
            color: rgb(0, 0, 0),
            opacity: .5
        })
        pages[0].drawText('BlockCertify', {
            x: 750,
            y: 200,
            size: 40,
            font: font,
            color: rgb(0, 0, 0),
            opacity: .5
        })


        const certificate = await pdfDoc.save();

        const bytes = new Uint8Array(certificate);
        const blob = new Blob([bytes], { type: "application/pdf", });

        let blobURL = URL.createObjectURL(blob);

        const newWindow = window.open(blobURL);

        setTimeout(function () {
            newWindow.document.title = studentName;
        }, 10);
    }

    const generate = async (e) => {
        e.preventDefault();
        const studentName = e.currentTarget.studentName.value;
        const orgnisationName = e.currentTarget.orgnisationName.value;
        const digitalSign = e.currentTarget.digitalSign.value;

        if (!studentName || !orgnisationName || !digitalSign)
            return toast.error('Please fill all details');
        try {

            const res = await fetch('/api/certificate', {
                method: 'POST',
                body: JSON.stringify({ studentName, orgnisationId: user.id }),
            })
            const data = await res.json();
            toast[data.type](data.message);

            downloadCertificate(studentName, orgnisationName, digitalSign);



        } catch (error) {
            toast.error(error.message);
        }

    }

    return (
        <section className='w-full'>
            <div className='bg-primary w-full flex relative z-5 px-8'>
                <form className="w-full mx-auto flex flex-col gap-3 translate-y-12 relative z-10" onSubmit={generate}>
                    <div className="grid grid-cols-2 gap-2 text-white">
                        <Input className="text-color" type="text" label="Student Name" name='studentName' disabled={loading} autoComplete='studentName' />
                        <Input className="text-color" type="text" label="Orgnisation Name" name='orgnisationName' disabled={loading} autoComplete='orgnisationName' />
                        <Input className="text-color" type="text" label="Digital Sign" name='digitalSign' disabled={loading} autoComplete='digitalSign' />
                    </div>
                    <button type="submit" className="flex gap-2 items-center justify-center bg-secondary px-2 py-2 rounded-md text-white font-bold">
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
        </section>
    )
}

export default GenerateCertificates