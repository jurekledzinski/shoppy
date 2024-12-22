import { NextResponse } from 'next/server';

import { auth } from '@/auth';
import { jwtVerify } from 'jose';

const checkoutProcess = ['/shipping', '/place-order', '/details-order'];

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;

const guestSecret = new TextEncoder().encode(secretGuest);
const stepperSecret = new TextEncoder().encode(secretStepper);

export default auth(async (request) => {
  try {
    const { pathname } = request.nextUrl;
    const cookieGuest = request.cookies.get('guestId') ?? null;
    const cookieStepper = request.cookies.get('stepper') ?? null;

    // console.log('cookieGuest middleware', cookieGuest);
    // console.log('cookieStepper middleware', cookieStepper);

    const guestCookieValue = cookieGuest
      ? await jwtVerify<{ value: string }>(cookieGuest.value, guestSecret)
      : null;

    const stepperCookieValue = cookieStepper
      ? await jwtVerify<{ value: { allowed: string; completed: string[] } }>(
          cookieStepper.value,
          stepperSecret
        )
      : null;

    //   prevent when user normal not login in
    if (
      (!request.auth && pathname.startsWith('/profile')) ||
      (!request.auth && pathname.startsWith('/orders'))
    ) {
      const newUrl = new URL('/', request.nextUrl.origin);
      return NextResponse.redirect(newUrl);
    }

    // Is this isProccesCheckoutRoute
    const isProtectedCheckout = checkoutProcess.some((item) =>
      pathname.includes(item)
    );

    // console.log('isProtectedCheckout middleware', isProtectedCheckout);

    //Kiedy nie zalogowany user normalnie
    if (!request.auth && isProtectedCheckout) {
      //   console.log('check 1');
      if (!guestCookieValue || !stepperCookieValue) {
        // gdy nie jest także zalogowany jako guest user i nie ma stepper cookie to redirect do home page
        // console.log('check 2');
        const newUrl = new URL('/', request.nextUrl.origin);
        return NextResponse.redirect(newUrl);
      }

      // gdy user kontynuuje jako guest user
      const allowedPath = stepperCookieValue.payload.value.allowed;

      const restProtectedSteps = checkoutProcess.filter(
        (item) => !allowedPath.includes(item)
      );

      const isNotAllowedStep = restProtectedSteps.some((item) =>
        pathname.includes(item)
      );
      //   console.log('check 3');
      //   console.log('isNotAllowedStep', isNotAllowedStep);
      if (isNotAllowedStep) {
        // console.log('check 4');
        const newUrl = new URL(allowedPath, request.nextUrl.origin);
        return NextResponse.redirect(newUrl);
      }

      //   console.log('check 5');
      return NextResponse.next();
    }

    // Kiedy zalogowany normalnie user i jest któraś ze stron ['/shipping', '/place-order', '/details-order'] i nie ma cookie stepper

    if (request.auth && isProtectedCheckout) {
      //   console.log('check 6');
      // kiedy normalnie zalogowany user ale nie ma cookie stepper to
      if (!stepperCookieValue) {
        // console.log('check 7');
        const newUrl = new URL('/', request.nextUrl.origin);
        return NextResponse.redirect(newUrl);
      }

      // kiedy normalnie zalogowany user to
      const allowedPath = stepperCookieValue.payload.value.allowed;

      //   console.log('jako zalogowany allowed path --------- ', allowedPath);

      const restProtectedSteps = checkoutProcess.filter(
        (item) => !allowedPath.includes(item)
      );

      const isNotAllowedStep = restProtectedSteps.some((item) =>
        pathname.includes(item)
      );
      //   console.log('check 8');

      if (isNotAllowedStep) {
        // console.log('check 9');
        const newUrl = new URL(allowedPath, request.nextUrl.origin);
        return NextResponse.redirect(newUrl);
      }
      //   console.log('check 10');
      return NextResponse.next();
    }

    // console.log('check 11');

    return NextResponse.next();
  } catch (error) {
    console.log('error try catch middleware', error);
    const newUrl = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
  //   matcher: [
  //     '/profile',
  //     '/orders',
  //     '/shipping',
  //     '/place-order',
  //     '/details-order',
  //   ],
};
