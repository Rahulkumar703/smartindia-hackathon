import { NextResponse } from "next/server";
import Orgnisation from "@/models/Orgnisation";
import mongoose from "mongoose";

export const GET = async (req, { params }) => {
    try {
        const { orgId } = params;

        if (!mongoose.Types.ObjectId.isValid(orgId))
            return NextResponse.json(
                { message: 'Invalid Orgnisation', type: "error", success: false },
                { status: 404 }
            )

        const res = await Orgnisation.findById(orgId).select({ templates: 1 });

        return NextResponse.json(
            { message: 'templates fetched successfully', type: "success", success: true, templates: res.templates },
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