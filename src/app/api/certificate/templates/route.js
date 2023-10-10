import { NextResponse } from "next/server";
import Orgnisation from "@/models/Orgnisation";

export const GET = async (req) => {
    try {

        const { templates } = await Orgnisation.findById('6523a49c628f047d22fe5c75');

        return NextResponse.json(
            { message: 'templates fetched successfully', type: "success", success: true, templates },
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