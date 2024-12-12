'use server';

import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const convertHeadersToObject = async (headers: ReadonlyHeaders) => {
  const header = Object.fromEntries(headers.entries());
  delete header['content-length'];
  return header;
};
