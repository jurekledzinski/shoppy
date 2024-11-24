import 'server-only';
import jwt from 'jsonwebtoken';

export const createTokenForgetPassword = (email: string) => {
  const secret = process.env.JWT_SECRET_FORGET_PASSWORD!;
  const lifeTimeAccessToken = process.env.JWT_LIFETIME_SECRET_FORGET_PASSWORD!;
  return jwt.sign({ email }, secret, { expiresIn: lifeTimeAccessToken });
};
