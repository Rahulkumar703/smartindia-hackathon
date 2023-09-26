import Certificate from "@/models/Certificate";
import { NextResponse } from "next/server";

export const GET = async (req, params) => {
    try {
        const { id } = params.params;

        const certificate = await Certificate.findOne({ _id: id });

        if (!certificate)
            return NextResponse.json(
                { message: 'Certificate with this number not found.', type: "info", success: false },
                { status: 404 }
            )

        return NextResponse.json(
            { message: 'certificate verified successfully', type: "success", success: true, certificate },
            { status: 200 }
        )


    } catch (error) {
        console.table(error);
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )

    }

}