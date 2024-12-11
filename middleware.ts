import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export default auth((request) => {
  const { pathname } = request.nextUrl;

  if (
    (!request.auth && pathname.startsWith('/profile')) ||
    (!request.auth && pathname.startsWith('/orders'))
  ) {
    const newUrl = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
