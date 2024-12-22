import 'server-only';
import { SignJWT } from 'jose';

export const createToken = async (
  payload: string | object,
  secret: string,
  timeExp: string
) => {
  const secretToken = new TextEncoder().encode(secret);

  const token = await new SignJWT({ value: payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(timeExp)
    .sign(secretToken);

  return token;
};
