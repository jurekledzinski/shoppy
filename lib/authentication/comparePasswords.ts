import 'server-only';
import bcrypt from 'bcrypt';
import { comparePasswordsFn } from './types';

export const comparePasswords: comparePasswordsFn = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};
