"use client"
import { PDFDocument, StandardFonts, fontkit, rgb } from "pdf-lib";
import { FiUploadCloud } from "react-icons/fi";

function formatToFourDigits(number) {
    if (number < 10) {
        return "000" + number;
    } else if (number < 100) {
        return "00" + number;
    } else if (number < 1000) {
        return "0" + number;
    } else {
        return number.toString();
    }
}

const CertificateDownloadBtn = ({ certificate }) => {
    const { studentName, OrgnisationName } = certificate

    const downloadCertificate = async () => {
        const res = await fetch('/certificateTemplate.pdf')
        const pdfBuffer = await res.arrayBuffer();

        let pdfDoc = await PDFDocument.load(pdfBuffer)

        pdfDoc.registerFontkit(fontkit)

        const font = pdfDoc.embedStandardFont(StandardFonts.CourierBold);

        const pages = pdfDoc.getPages();

        pages[0].drawText(formatToFourDigits(studentName), {
            x: 110,
            y: 452,
            size: 30,
            font: font,
            color: rgb(0, 0, 0),
            opacity: .6
        })
        pages[0].drawText(OrgnisationName, {
            x: 280,
            y: 412,
            size: 30,
            font: font,
            color: rgb(0, 0, 0)
        })


        const certificate = await pdfDoc.save();

        const bytes = new Uint8Array(certificate);
        const blob = new Blob([bytes], { type: "application/pdf", });

        let blobURL = URL.createObjectURL(blob);

        const newWindow = window.open(blobURL);

        setTimeout(function () {
            newWindow.document.title = name;
        }, 10);
    }

    return (
        <button className='flex gap-2 items-center justify-center bg-secondary px-2 py-2 rounded-md text-white font-bold' onClick={downloadCertificate}>
            <FiUploadCloud size={20} />
            Generate
        </button>
    )
}

export default CertificateDownloadBtn