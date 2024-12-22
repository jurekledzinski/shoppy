import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export const setCookieGuestId = (
  cookieStore: ReadonlyRequestCookies,
  tokenGuest: string,
  expiresIn: Date
) => {
  cookieStore.set({
    name: 'guestId',
    value: tokenGuest,
    httpOnly: true,
    path: '/',
    expires: expiresIn,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};

export const setCookieStepper = (
  cookieStore: ReadonlyRequestCookies,
  tokenStepper: string,
  expiresIn: Date
) => {
  cookieStore.set({
    name: 'stepper',
    value: tokenStepper,
    httpOnly: true,
    path: '/',
    expires: expiresIn,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
};
