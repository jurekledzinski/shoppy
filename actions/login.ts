'use server';
import { actionTryCatch } from '@/helpers';
import { cookies } from 'next/headers';
import { createToken } from '@/lib';
import { LoginUserSchema } from '@/models';
import { setCookieStepper } from '@/app/_helpers';
import { signIn } from '@/auth';

const secretStepper = process.env.STEPPER_SECRET!;
const expireStepperToken = process.env.EXPIRE_STEPPER_TOKEN!;

const payloadStepper = { allowed: '/shipping', completed: ['/'] };

export const login = actionTryCatch(
  async (prevState: unknown, formData: FormData) => {
    const cookieStore = await cookies();
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
        payloadStepper,
        secretStepper,
        expireStepperToken
      );

      const expiresIn = new Date(Date.now() + 30 * 60 * 1000);
      setCookieStepper(cookieStore, tokenStepper, expiresIn);
    }

    return { message: 'Login success', success: true };
  }
);
