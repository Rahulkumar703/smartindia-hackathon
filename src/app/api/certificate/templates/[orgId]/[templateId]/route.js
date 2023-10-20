import { NextResponse } from "next/server";
import Orgnisation from "@/models/Orgnisation";
import mongoose from "mongoose";

export const GET = async (req, { params }) => {
    try {
        const { orgId, templateId } = params;

        if (!mongoose.Types.ObjectId.isValid(orgId))
            return NextResponse.json(
                { message: 'Invalid Orgnisation', type: "error", success: false },
                { status: 404 }
            )

        const res = await Orgnisation.findById(orgId).select({ templates: 1 });

        const template = res.templates.filter((r) => r._id.toString() === templateId); // Convert _id to string for comparison

        return NextResponse.json(
            { message: 'templates fetched successfully', type: "success", success: true, template: template[0] },
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