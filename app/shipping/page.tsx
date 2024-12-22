import { auth } from '@/auth';
import { cookies, headers } from 'next/headers';
import { getDomain, tokenVerify } from '../_helpers';
import { Order, UserRegister } from '@/models';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { ShippingSection } from '@/components/pages';
import { Step, Stepper } from '@/components/shared';
import { steps } from '@/data';
import { tryCatch } from '@/helpers';

const fetchOrder = tryCatch<Order>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 3600, tags: ['get_order'] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
);

const fetchUser = tryCatch<Omit<UserRegister, 'password'>>(
  async (url: string, headers?: ReadonlyHeaders) => {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      next: { revalidate: 3600, tags: ['get_user'] },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  }
);

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;

const Shipping = async () => {
  const session = await auth();
  const domain = await getDomain();
  const headersFetch = await headers();
  const cookieStore = await cookies();

  const guestCookie = cookieStore.get('guestId') ?? null;
  const stepperCookie = cookieStore.get('stepper') ?? null;

  const urlGetUser = `${domain}/api/v1/user?id=${session?.user.id}`;
  const resUser = session ? await fetchUser(urlGetUser, headersFetch) : null;

  const guestCookieDecoded = guestCookie
    ? await tokenVerify<{ value: string }>(guestCookie.value, secretGuest)
    : null;

  const stepperCookieDecoded = stepperCookie
    ? await tokenVerify<{ value: { allowed: string; completed: string[] } }>(
        stepperCookie.value,
        secretStepper
      )
    : null;

  const urlGetOrder = `${domain}/api/v1/order`;
  const resOrder =
    guestCookieDecoded || session
      ? await fetchOrder(urlGetOrder, headersFetch)
      : null;

  console.log('resOrder page shipping', resOrder);

  const completedSteps = stepperCookieDecoded
    ? stepperCookieDecoded.payload.value.completed
    : [];

  return (
    <ShippingSection
      guestId={guestCookieDecoded ? guestCookieDecoded.payload.value : null}
      orderData={resOrder && resOrder.success ? resOrder.data : null}
      userData={resUser && resUser.success ? resUser.data : null}
    >
      <Stepper>
        {steps.map((step) => {
          return (
            <Step
              key={step.label}
              icon={step.icon}
              label={step.label}
              path={step.path}
              completed={completedSteps.includes(step.path)}
            />
          );
        })}
      </Stepper>
    </ShippingSection>
  );
};

export default Shipping;
