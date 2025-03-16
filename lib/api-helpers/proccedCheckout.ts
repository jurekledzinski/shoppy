import 'server-only';
import {
  getAuthSecrets,
  getSessionData,
  verifyGuestUser,
  verifyStepper,
} from '../actions-helpers';
import { getDomain } from '@/helpers';
import { fetchOrder, fetchUser } from './fetchApi';
import { endpoints } from './configApi';
import { GetOrderData, GetUserData } from './types';

export const getUserData: GetUserData = async (
  session,
  domain,
  headersData
) => {
  if (!session) return null;
  const userId = session.user.id;
  const response = await fetchUser(endpoints.user(domain, userId), headersData);
  return response?.success ? response.data : null;
};

export const getOrderData: GetOrderData = async (
  isAuthorized,
  domain,
  headersData
) => {
  if (!isAuthorized) return null;
  const response = await fetchOrder(endpoints.order(domain), headersData);
  return response?.success ? response.data : null;
};

export const getProccedCheckoutData = async (isFetchUser?: boolean) => {
  const AUTH = await getAuthSecrets();
  const domain = await getDomain();
  const { cookieGuest, cookieStepper, session, headersData } =
    await getSessionData();
  const isAuthorized = Boolean(cookieGuest || session);

  const guestId = await verifyGuestUser(cookieGuest!, AUTH.SECRET_GUEST);

  const stepper = await verifyStepper(cookieStepper!, AUTH.SECRET_STEPPER);

  const userData = isFetchUser
    ? await getUserData(session, domain, headersData)
    : null;

  const orderData = await getOrderData(isAuthorized, domain, headersData);

  const completedSteps = stepper?.payload.value.completed || [];

  return { guestId, userData, orderData, completedSteps };
};
