'use server';
import { actionTryCatch } from '@/helpers';
import {
  createToken,
  getAuthSecrets,
  getSessionData,
  setCookieStepper,
  stepperStepsStart,
} from '@/lib';
import { LoginUserSchema } from '@/models';
import { signIn } from '@/auth';

export const login = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const AUTH = await getAuthSecrets();
    const STEPPER_PAYLOAD = await stepperStepsStart();
    const { cookieStore } = await getSessionData();

    const body = Object.fromEntries(formData);

    const paramsCheckout = body.params;
    delete body.params;

    const parsedData = LoginUserSchema.parse(body);

    await signIn('credentials', {
      email: parsedData.email,
      password: parsedData.password,
      redirect: false,
    });

    if (paramsCheckout === 'login') {
      const tokenStepper = await createToken(
        STEPPER_PAYLOAD,
        AUTH.SECRET_STEPPER,
        AUTH.EXPIRE_STEPPER_TOKEN
      );

      const expiresIn = new Date(Date.now() + 30 * 60 * 1000);
      setCookieStepper(cookieStore, tokenStepper, expiresIn);
    }

    return { message: 'Login success', success: true };
  }
);
