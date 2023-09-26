
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import Orgnisation from "@/models/Orgnisation";

dbConnect()

export async function POST(req) {
    try {

        const reqBody = await req.json();
        const { name, address, email, phone, password } = reqBody;


        // ============= Check if User Exist =============
        const orgnisation = await Orgnisation.findOne({ '$or': [{ email }, { phone }] });

        if (orgnisation) {
            return NextResponse.json(
                { message: "You are already registered please Login", type: "info", success: false },
                { status: 409 }
            )
        }
        // ============= Check if User Exist =============



        // ============= Inserting the User =============
        const newOrgnisation = await Orgnisation.create({ name, address, email, phone, password });
        // ============= Inserting the User =============

        return NextResponse.json(
            { message: "Registration done, please login.", type: "success", success: true },
            { status: 200 }
        )

    } catch (error) {
        console.table(error)
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }
}