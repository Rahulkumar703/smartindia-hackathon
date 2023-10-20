import dbConnect from '@/lib/dbConnect';
import verifyJWT from "@/lib/verifyJWT";
import { NextResponse } from 'next/server';

dbConnect()

export async function GET(req) {

    try {
        const token = req.cookies.get('auth')?.value;

        const payload = await verifyJWT(token);
        return NextResponse.json(
            { message: 'authenticated', type: "success", success: true, user: { id: payload.id, name: payload.name, logo: payload?.logo, userType: payload.userType } },
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