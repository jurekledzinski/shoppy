'use server';
import {
  createToken,
  verifyToken,
  getExpireInCookie,
  setCookieGuestId,
  setCookieStepper,
  getSessionData,
  getAuthSecrets,
} from '@/lib';

export const extendGuestSession = async (
  prevState: unknown,
  formData: FormData
) => {
  const AUTH = await getAuthSecrets();
  const { cookieGuest, cookieStepper, cookieStore } = await getSessionData();
  Object.fromEntries(formData);

  const expiresIn = getExpireInCookie();

  if (cookieGuest && cookieStepper) {
    const dataGuest = await verifyToken<{ value: string }>(
      cookieGuest.value,
      AUTH.SECRET_GUEST
    );

    const dataStepper = await verifyToken<{
      value: { allowed: string; completed: string[] };
    }>(cookieStepper.value, AUTH.SECRET_STEPPER);

    const tokenGuest = await createToken(
      dataGuest.payload.value,
      AUTH.SECRET_GUEST,
      AUTH.EXPIRE_GUEST_TOKEN
    );

    const tokenStepper = await createToken(
      dataStepper.payload.value,
      AUTH.SECRET_STEPPER,
      AUTH.EXPIRE_STEPPER_TOKEN
    );

    setCookieGuestId(cookieStore, tokenGuest, expiresIn);
    setCookieStepper(cookieStore, tokenStepper, expiresIn);
  }

  return {
    message: 'Guest user session extended successful',
    success: true,
  };
};
