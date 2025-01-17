import 'server-only';
import { getToken } from 'next-auth/jwt';

const secret = process.env.AUTH_SECRET;

export const getAuthToken = async (
  req: Request | { headers: Record<string, string> | Headers }
) => {
  const cookieKey =
    process.env.NODE_ENV === 'development'
      ? 'authjs.session-token'
      : '__Secure-authjs.session-token';

  const token = await getToken({
    req,
    secret,
    salt: cookieKey,
    cookieName: cookieKey,
  });

  return token;
};
