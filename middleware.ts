import { auth } from '@/auth';
import { jwtVerify, JWTVerifyResult } from 'jose';
import { NextResponse, NextRequest } from 'next/server';

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

    if (guestCookieValue) {
      const guestUserExpire = guestCookieValue.payload.exp! * 1000;
      const alertTime = new Date(guestUserExpire - 10 * 60 * 1000).getTime();
      const currentTime = Date.now();

      if (currentTime >= alertTime) {
        const url = new URL(request.url);
        console.log('MID', request.url);
        if (!url.searchParams.has('guest-user-expired')) {
          url.searchParams.set('guest-user-expired', 'true');
          return NextResponse.redirect(url);
        }
      }
    }

    if (
      (!request.auth && pathname.startsWith('/profile')) ||
      (!request.auth && pathname.startsWith('/orders'))
    ) {
      return redirectToPage(request, '/');
    }

    const isProtectedCheckout = checkoutProcess.some((item) =>
      pathname.includes(item)
    );

    if (!request.auth && isProtectedCheckout) {
      if (!guestCookieValue || !stepperCookieValue) {
        return redirectToPage(request, '/');
      }

      return checkAccessCheckout(stepperCookieValue, pathname, request);
    }

    if (request.auth && isProtectedCheckout) {
      if (!stepperCookieValue) {
        return redirectToPage(request, '/');
      }

      return checkAccessCheckout(stepperCookieValue, pathname, request);
    }

    return NextResponse.next();
  } catch {
    return redirectToPage(request, '/');
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

function redirectToPage(request: NextRequest, path: string) {
  const newUrl = new URL(path, request.nextUrl.origin);
  return NextResponse.redirect(newUrl);
}

function checkAccessCheckout(
  stepperCookieValue: JWTVerifyResult<{
    value: {
      allowed: string;
      completed: string[];
    };
  }>,
  pathname: string,
  request: NextRequest
) {
  const allowedPath = stepperCookieValue.payload.value.allowed;

  const restProtectedSteps = checkoutProcess.filter(
    (item) => !allowedPath.includes(item)
  );

  const isNotAllowedStep = restProtectedSteps.some((item) =>
    pathname.includes(item)
  );

  if (isNotAllowedStep) {
    return redirectToPage(request, allowedPath);
  }

  return NextResponse.next();
}
