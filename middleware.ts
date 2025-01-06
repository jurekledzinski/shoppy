import { auth } from '@/auth';
import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

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

    const guestCookieValue = cookieGuest
      ? await jwtVerify<{ value: string }>(cookieGuest.value, guestSecret)
      : null;

    const stepperCookieValue = cookieStepper
      ? await jwtVerify<{ value: { allowed: string; completed: string[] } }>(
          cookieStepper.value,
          stepperSecret
        )
      : null;

    //   ----------------

    // if (guestCookieValue) {
    //   const guestUserExpire = guestCookieValue.payload.exp! * 1000;
    //   const alertTime = new Date(guestUserExpire - 28 * 60 * 1000).getTime();
    //   const currentTime = Date.now();

    //   console.log('Alert time', new Date(guestUserExpire - 28 * 60 * 1000));
    //   console.log('Current time', new Date());

    //   if (currentTime >= alertTime) {
    //     console.log('------ GUEST EXPIRED IN 28 MINUTES ------');
    //     const url = new URL(request.url);
    //     if (!url.searchParams.has('guest-user-expired')) {
    //       url.searchParams.set('guest-user-expired', 'true');
    //       return NextResponse.redirect(url);
    //     }
    //   }
    // }
    // console.log('guestCookieValue middleware', guestCookieValue);

    // ----------------

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

    //Kiedy nie zalogowany user normalnie
    if (!request.auth && isProtectedCheckout) {
      if (!guestCookieValue || !stepperCookieValue) {
        // gdy nie jest także zalogowany jako guest user i nie ma stepper cookie to redirect do home page
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

      if (isNotAllowedStep) {
        const newUrl = new URL(allowedPath, request.nextUrl.origin);
        return NextResponse.redirect(newUrl);
      }

      return NextResponse.next();
    }

    // Kiedy zalogowany normalnie user i jest któraś ze stron ['/shipping', '/place-order', '/details-order'] i nie ma cookie stepper

    if (request.auth && isProtectedCheckout) {
      // kiedy normalnie zalogowany user ale nie ma cookie stepper to
      if (!stepperCookieValue) {
        const newUrl = new URL('/', request.nextUrl.origin);
        return NextResponse.redirect(newUrl);
      }

      // kiedy normalnie zalogowany user to
      const allowedPath = stepperCookieValue.payload.value.allowed;

      const restProtectedSteps = checkoutProcess.filter(
        (item) => !allowedPath.includes(item)
      );

      const isNotAllowedStep = restProtectedSteps.some((item) =>
        pathname.includes(item)
      );

      if (isNotAllowedStep) {
        const newUrl = new URL(allowedPath, request.nextUrl.origin);
        return NextResponse.redirect(newUrl);
      }
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch {
    const newUrl = new URL('/', request.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
