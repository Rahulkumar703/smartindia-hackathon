import Certificate from "@/models/Certificate";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {

        const reqBody = await req.json();
        const { formData, templateId, orgnisationId } = reqBody;

        await Certificate.create({ certificateInfo: formData, templateId, orgnisationId });

        return NextResponse.json(
            { message: 'certificate created successfully', type: "success", success: true },
            { status: 200 }
        )

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )

    }

}
export const GET = async (req) => {
    try {

        const cookies = req.cookies;
        console.log(cookies);

        const certificates = await Certificate.find();

        return NextResponse.json(
            { message: 'certificate created successfully', type: "success", success: true, certificates },
            { status: 200 }
        )

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )

    }

}