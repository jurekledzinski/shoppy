import 'server-only';
import { jwtVerify } from 'jose';

export const verifyToken = async <T>(token: string, secret: string) => {
  const secretToken = new TextEncoder().encode(secret);
  return await jwtVerify<T>(token, secretToken);
};
