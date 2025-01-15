import 'server-only';
import { SignJWT } from 'jose';
import { createTokenFn } from './types';

export const createToken: createTokenFn = async (payload, secret, timeExp) => {
  const secretToken = new TextEncoder().encode(secret);

  const token = await new SignJWT({ value: payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(timeExp)
    .sign(secretToken);

  return token;
};
