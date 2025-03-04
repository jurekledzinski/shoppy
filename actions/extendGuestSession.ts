'use server';
import {
  createToken,
  getExpireInCookie,
  setCookieGuestId,
  setCookieStepper,
  getSessionData,
  getAuthSecrets,
  validationData,
} from '@/lib';

export const extendGuestSession = async (
  prevState: unknown,
  formData: FormData
) => {
  const AUTH = await getAuthSecrets();
  const { cookieGuest, cookieStepper, cookieStore } = await getSessionData();

  Object.fromEntries(formData);

  const result = await validationData(cookieGuest, null, cookieStepper);
  if ('message' in result) return result;
  const { guest, stepper } = result;

  const expiresIn = getExpireInCookie();

  if (cookieGuest && cookieStepper) {
    const tokenGuest = await createToken(
      guest,
      AUTH.SECRET_GUEST,
      AUTH.EXPIRE_GUEST_TOKEN
    );

    const tokenStepper = await createToken(
      stepper ?? '',
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
