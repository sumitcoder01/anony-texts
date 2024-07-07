import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
    matcher: ['/u/:path*', '/dashboard/:path*', '/login', '/register', '/verify-user/:path*', '/forgot-password'],
};

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request });
    const url = request.nextUrl;

    // Redirect to dashboard if the user is already authenticated
    // and trying to access sign-in, sign-up, or home page
    if (token &&
        (url.pathname.startsWith('/login') ||
            url.pathname.startsWith('/register') ||
            url.pathname.startsWith('/verify-user'))
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    else if (!token && (
        url.pathname.startsWith('/dashboard') ||
        url.pathname === '/' ||
        url.pathname.startsWith('/u'))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
    return NextResponse.next();
}