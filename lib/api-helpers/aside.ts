import 'server-only';
import { getDomain } from '@/helpers';
import { getUserData } from './proccedCheckout';

import {
  getAuthSecrets,
  getSessionData,
  verifyGuestUser,
} from '../actions-helpers';

export const getAsidetData = async () => {
  const AUTH = await getAuthSecrets();
  const domain = await getDomain();
  const { cookieGuest, session, headersData } = await getSessionData();

  const guestId = await verifyGuestUser(cookieGuest!, AUTH.SECRET_GUEST);

  const userData = await getUserData(session, domain, headersData);

  return { guestId, userData };
};
