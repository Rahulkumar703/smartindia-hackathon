import Certificate from "@/models/Certificate";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {

        const reqBody = await req.json();
        const { studentName, orgnisationId } = reqBody;

        await Certificate.create({ studentName, orgnisationId });

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