import { auth } from '@/auth';
import { cookies, headers } from 'next/headers';
import { getDomain, tokenVerify } from '@/app/_helpers';
import { Order } from '@/models';
import { PlaceOrderSection } from '@/components/pages';
import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { tryCatch } from '@/helpers';
import { steps } from '@/data';
import { Step, Stepper } from '@/components/shared';

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

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;

const PlaceOrder = async () => {
  const session = await auth();
  const domain = await getDomain();
  const headersFetch = await headers();
  const cookieStore = await cookies();
  const guestCookie = cookieStore.get('guestId') ?? null;
  const stepperCookie = cookieStore.get('stepper') ?? null;

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

  const completedSteps = stepperCookieDecoded
    ? stepperCookieDecoded.payload.value.completed
    : [];

  return (
    <PlaceOrderSection
      orderData={resOrder && resOrder.success ? resOrder.data : null}
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
    </PlaceOrderSection>
  );
};

export default PlaceOrder;
