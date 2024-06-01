import { NextRequest, NextResponse } from "next/server";
import { isSessionValid } from "./app/lib/actions";

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};


const publicRoutes = [
    '/',
    '/login',
    '/signup'
]


export async function middleware(req: NextRequest) {
    const pathName = req.nextUrl.pathname;

    // Se a rota for para arquivos estáticos, deixe o Next.js lidar com isso
    if (pathName.startsWith('/_next/') || pathName.startsWith('/static/') || pathName.startsWith('/assets/')) {
        return NextResponse.next();
    }

    if (publicRoutes.includes(pathName)) {
        return NextResponse.next();
    }


    const session = await isSessionValid();

    if (!session) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next();
}