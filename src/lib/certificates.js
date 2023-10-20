import { PDFDocument, StandardFonts, fontkit, rgb } from "pdf-lib";

function fileToArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        // Set up a callback function for when the file is loaded
        reader.onload = (event) => {
            const arrayBuffer = event.target.result;
            resolve(arrayBuffer);
        };

        // Set up a callback function for handling errors
        reader.onerror = (event) => {
            reject(event.target.error);
        };

        // Read the file as an ArrayBuffer
        reader.readAsArrayBuffer(file);
    });
}

export const renderCertificateTemplate = async (templateState) => {

    let pdfBuffer;
    if (templateState.hasOwnProperty('pdfFile')) {
        pdfBuffer = await fileToArrayBuffer(templateState.pdfFile);
    }
    else if (templateState.url) {
        try {
            const res = await fetch(templateState.url);
            pdfBuffer = await res.arrayBuffer();

        } catch (error) {
            console.log(error);
            throw new Error(error.message)
        }
    }

    let pdfDoc = await PDFDocument.load(pdfBuffer)
    pdfDoc.registerFontkit(fontkit)
    const font = pdfDoc.embedStandardFont(StandardFonts.HelveticaBold);

    const pages = pdfDoc.getPages();
    const pageWidth = pages[0].getWidth();
    const pageHeight = pages[0].getHeight();

    templateState.fields.map(field => {

        const centerX = field.centerX;
        const centerY = field.centerY;
        const textWidth = font.widthOfTextAtSize(String(field.value), Number(field.size));
        const textHeight = font.sizeAtHeight(Number(field.size));

        const hexToRgb = field.color
            .match(/[A-Za-z0-9]{2}/g)
            .map(function (v) { return Math.round(parseInt(v, 16) / 255 * 100) / 100 })


        pages[0].drawText(String(field.value), {
            x: centerX ? (pageWidth / 2) - textWidth / 2 : Number(field.x),
            y: centerY ? (pageHeight / 2) - textHeight / 2 : Number(field.y),
            size: Number(field.size),
            font: font,
            color: rgb(hexToRgb[0], hexToRgb[1], hexToRgb[2]),
            opacity: Number(field.opacity)
        })
    })

    const certificate = await pdfDoc.save();
    const bytes = new Uint8Array(certificate);

    const blob = new Blob([bytes], { type: "application/pdf" });

    const blobURL = URL.createObjectURL(blob);

    return blobURL;
}
