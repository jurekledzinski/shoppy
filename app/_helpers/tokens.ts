import { verifyToken } from '@/lib';

export const tokenVerify = async <T>(tokenValue: string, secret: string) => {
  try {
    return await verifyToken<T>(tokenValue, secret);
  } catch {
    return null;
  }
};

export const getExpireInCookie = (time: number = 30 * 60 * 1000) =>
  new Date(Date.now() + time);
