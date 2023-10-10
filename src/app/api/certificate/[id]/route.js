import Certificate from "@/models/Certificate";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, params) => {
    try {
        const { id } = params.params;

        const validId = isValidObjectId(id);

        if (!validId)
            return NextResponse.json(
                { message: 'Invalid Certificate Number', type: "error", success: false },
                { status: 200 }
            )

        const certificate = await Certificate.findById(id);

        if (!certificate)
            return NextResponse.json(
                { message: 'Certificate with this number not found.', type: "info", success: false },
                { status: 404 }
            )

        return NextResponse.json(
            { message: 'Certificate verified successfully', type: "success", success: true },
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