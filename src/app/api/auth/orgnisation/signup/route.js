
import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import Orgnisation from "@/models/Orgnisation";
import { writeFile } from "fs/promises";
import path from "path";

dbConnect()

export async function POST(req) {
    try {

        const reqBody = await req.formData();
        // Create an object to store the destructured values
        const formValues = {};

        for (const [key, value] of reqBody.entries()) {
            formValues[key] = value;
        }

        // Destructure the values individually
        const { name, email, address, phone, logo, password } = formValues;


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

        const byteData = await logo.arrayBuffer();
        const buffer = Buffer.from(byteData);
        const fileExtension = logo.name.split('.')[logo.name.split('.').length - 1];
        const fileName = `${name}_logo_${new Date().getMilliseconds()}.${fileExtension}`
        const logoPath = `./public/${name}_logo_${new Date().getMilliseconds()}.${fileExtension}`;

        await writeFile(logoPath, buffer);

        const newOrgnisation = await Orgnisation.create({ name, address, email, phone, logo: `/${fileName}`, password });

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