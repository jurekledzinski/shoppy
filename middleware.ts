import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth');

  try {
    if (token) {
      jwt.verify(token.value, process.env.JWT_SECRET_ACCESS!);
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
  } catch {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/profile/:path*', '/orders/:path*'],
};
