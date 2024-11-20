import 'server-only';
import bcrypt from 'bcrypt';

export const comparePasswords = async (password: string, hash: string) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};
