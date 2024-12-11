import { z } from 'zod';
import { transformMessage } from './messagesJwtWebToken';

export type State = {
  message: string;
  success: boolean;
  body?: { email: string; id: string; name: string };
};

export const actionTryCatch = (
  fn: (prevState: unknown, formData: FormData) => Promise<State>
) => {
  return async (prevState: unknown, formData: FormData) => {
    try {
      return await fn(prevState, formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return {
          message: 'Wrong credentials, check your credentials',
          success: false,
        };
      } else {
        const err = error as Error;
        return { message: transformMessage(err.name), success: false };
      }
    }
  };
};
