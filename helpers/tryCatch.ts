import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const tryCatch = <T>(
  fn: (url: string, headers?: ReadonlyHeaders) => Promise<{ payload: T }>
) => {
  return async (
    url: string,
    headers?: ReadonlyHeaders
  ): Promise<
    { success: true; data: T } | { success: false; message: string }
  > => {
    try {
      const data = await fn(url, headers);
      return { success: true, data: data.payload };
    } catch (error) {
      if (error instanceof Error) {
        return { message: error.message, success: false };
      } else {
        return {
          message: 'Something went wrong, plese try later',
          success: false,
        };
      }
    }
  };
};
