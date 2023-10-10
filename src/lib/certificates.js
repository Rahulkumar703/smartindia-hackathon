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

    const pdfBuffer = await fileToArrayBuffer(templateState.pdfFile);

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

        pages[0].drawText(String(field.value), {
            x: centerX ? (pageWidth / 2) - textWidth / 2 : Number(field.x),
            y: centerY ? (pageHeight / 2) - textHeight / 2 : Number(field.y),
            size: Number(field.size),
            font: font,
            color: rgb(0, 0, 0),
            opacity: 1
        })
    })

    // pages[0].drawText(String(id), {
    //     x: 220,
    //     y: 50.5,
    //     size: 13,
    //     font: idFont,
    //     color: rgb(0, 0, 0),
    //     opacity: 1
    // })

    // pages[0].drawText(String(name).toUpperCase(), {
    //     x: 50,
    //     y: 342,
    //     size: 30,
    //     font: font,
    //     color: rgb(0, 0, 0)
    // })

    // let width = font.widthOfTextAtSize(name.toUpperCase(), 30);

    // pages[0].drawLine({
    //     start: { x: 48, y: 337 },
    //     end: { x: 55 + width, y: 337 },
    //     thickness: 2.5,
    //     color: rgb(0, 0, 0),
    //     opacity: .8,
    // })

    const certificate = await pdfDoc.save();
    const bytes = new Uint8Array(certificate);

    const blob = new Blob([bytes], { type: "application/pdf" });

    const blobURL = URL.createObjectURL(blob);

    return blobURL;
}
