import 'server-only';
import jwt from 'jsonwebtoken';

export const createToken = (_id: string) => {
  const secret = process.env.JWT_SECRET_ACCESS!;
  const lifeTimeAccessToken = process.env.JWT_LIFETIME_ACCESS!;
  return jwt.sign({ _id }, secret, { expiresIn: lifeTimeAccessToken });
};
