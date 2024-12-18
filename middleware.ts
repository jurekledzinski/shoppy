import { NextResponse } from 'next/server';

import { auth } from '@/auth';

const checkoutProcess = ['/shipping', '/place-order', '/details-order'];

export default auth((request) => {
  const { pathname } = request.nextUrl;

  if (
    (!request.auth && pathname.startsWith('/profile')) ||
    (!request.auth && pathname.startsWith('/orders'))
  ) {
    const newUrl = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  console.log('pathname middleware', pathname);

  const protecedCheckout = checkoutProcess.some((item) =>
    pathname.includes(item)
  );

  // weryfikacja cookie value
  // zdekodowana wartość path
  const przykladPathWcookie = '/shipping/place-order';

  //Kiedy nie zalogowany user lub gdt nie ma cookie lub token jest uszkodzony tez dodajitp

  if (
    (!request.auth && protecedCheckout) ||
    (!przykladPathWcookie && protecedCheckout)
  ) {
    const newUrl = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  //Kiedy zalogowany user lub quest session to protect dalsze kroki jesli bedzie chcial przeskoczyc kroki

  //   same checkoutProcess musi chronic dostep do stron bez cookie stepper

  //   pathname will be stored in cookie in this case
  //   cookie controll access and session user or session guest user
  //   tu pathname z cookie

  const restProtectedSteps = checkoutProcess.filter(
    (item) => !przykladPathWcookie.includes(item)
  );

  const isNotAllowedStep = restProtectedSteps.some((item) =>
    pathname.includes(item)
  );

  console.log('restProtectedSteps -----', restProtectedSteps);

  console.log('isNotAllowedStep', isNotAllowedStep);

  //   lepiej nie polegac na cookie tylko znalezc gdzie redirect

  if (request.auth && isNotAllowedStep) {
    const newUrl = new URL(przykladPathWcookie, request.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
