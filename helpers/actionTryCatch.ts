import { z } from 'zod';
import { transformMessage } from './messagesJwtWebToken';
import { AuthError } from 'next-auth';

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
      console.log('errr async ', error);
      if (error instanceof z.ZodError) {
        return {
          message: 'Incorrect credentials',
          success: false,
        };
      } else if (error instanceof AuthError) {
        if (error.type === 'AccessDenied') {
          return { message: transformMessage(error.type), success: false };
        }

        if (error.type === 'CredentialsSignin') {
          return { message: transformMessage(error.type), success: false };
        }

        return {
          message: 'Authentication failed',
          success: false,
        };
      } else {
        const err = error as Error;
        return { message: err.message, success: false };
      }
    }
  };
};
