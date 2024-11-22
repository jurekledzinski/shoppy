import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth');

  //   if (!token) {
  //     const url = request.nextUrl.clone();
  //     url.pathname = '/';
  //     return NextResponse.redirect(url);
  //   }

  try {
    if (token) {
      const secretKey = new TextEncoder().encode(
        process.env.JWT_SECRET_ACCESS!
      );

      await jwtVerify(token.value, secretKey);
    }

    if (
      (pathname.startsWith('/profile') && !token) ||
      (pathname.startsWith('/orders') && !token)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  } catch (err) {
    console.log('ee', err);
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/profile/:path*', '/orders/:path*'],
};
