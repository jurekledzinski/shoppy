import { headers } from 'next/headers';

// TODO: Change before production to: const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

export const getDomain = async () => {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'http';
  return `${protocol}://${host}`;
};
