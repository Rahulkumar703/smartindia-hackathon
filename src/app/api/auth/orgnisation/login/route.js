import { NextResponse } from "next/server";
import dbConnect from '@/lib/dbConnect'
import bcrypt from 'bcrypt'
import signJWT from "@/lib/signJWT";
import Orgnisation from "@/models/Orgnisation";

dbConnect()

export async function POST(req) {
    try {

        const reqBody = await req.json();
        const { email, password, rememberMe } = reqBody;

        const EXPIRATION_TIME = rememberMe ? '7d' : '1d';
        console.log(EXPIRATION_TIME);

        // ============= Check if Orgnisation Exist =============

        const orgnisation = await Orgnisation.findOne({ email }).select('+password');

        if (!orgnisation) {
            return NextResponse.json(
                { message: "Please create an account first.", type: "error", success: false },
                { status: 404 }
            )
        }

        // ============= Check if Orgnisation Exist =============


        // ============= Matching the Password =============

        const dbPassword = orgnisation.password;
        const passwordMatched = await bcrypt.compare(password, dbPassword);

        // ============= Matching the Password =============


        if (passwordMatched) {

            // ============= Creating the JWT Token =============

            const token = await signJWT({ id: orgnisation._id, email: orgnisation.email, logo: orgnisation.logo, userType: 'stu' }, EXPIRATION_TIME);

            // ============= Creating the JWT Token =============



            // ============= Updating Token in DB =============

            // const updateToken = await query({
            //     query: "UPDATE Orgnisations SET token = ? WHERE id = ?",
            //     values: [token, Orgnisation[0].id]
            // })

            // ============= Updating Token in DB =============

            const response = NextResponse.json(
                { message: "login successfull", type: "success", success: true, user: { id: orgnisation._id, name: orgnisation.name, logo: orgnisation.logo } },
                { status: 200 }
            )

            // ============= Setting Cookie =============

            response.cookies.set({
                name: 'auth',
                value: token,
                maxAge: rememberMe ? 60 * 60 * 24 * 7 : 60 * 60 * 24,
                httpOnly: true,
                sameSite: 'strict',
            })

            // ============= Setting Cookie =============

            return response;
        }
        else {
            return NextResponse.json(
                { message: "Please check your credentials.", type: "error", success: false },
                { status: 500 }
            )
        }

    } catch (error) {
        console.table(error);
        return NextResponse.json(
            { message: error.message, type: "error", success: false },
            { status: 500 }
        )
    }
}