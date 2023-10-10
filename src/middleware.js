import { NextResponse } from "next/server";

const middleware = async (request) => {
    const { pathname } = request.nextUrl

    const token = request.cookies.get('auth')?.value;
    const publicUrl = [
        '/student/login',
        '/student/signup',
        '/orgnisation/login',
        '/orgnisation/signup'
    ];

    const isPublicUrl = publicUrl.includes(pathname);

    if (token && isPublicUrl) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!token && !publicUrl) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return;
}

export const config = {
    matcher: [
        '/',
        '/student/dashboard/:path*',
        '/orgnisation/dashboard/:path*',
        '/student/login',
        '/student/signup',
        '/orgnisation/login',
        '/orgnisation/signup'
    ],
}

export default middleware