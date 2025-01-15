import { auth } from '@/auth';
import { cookies, headers } from 'next/headers';
import { fetchOrder, tokenVerify } from '@/app/_helpers';
import { getDomain } from '@/app/_helpers';
import { PlaceOrderSection } from '@/components/pages';
import { Step, Stepper } from '@/components/shared';
import { steps } from '@/data';

const secretGuest = process.env.GUEST_SECRET!;
const secretStepper = process.env.STEPPER_SECRET!;

const PlaceOrder = async () => {
  const session = await auth();
  const domain = await getDomain();
  const headersFetch = await headers();
  const cookieStore = await cookies();
  const guestCookie = cookieStore.get('guestId') ?? null;
  const stepperCookie = cookieStore.get('stepper') ?? null;

  const guestCookieDecoded = guestCookie?.value
    ? await tokenVerify<{ value: string }>(guestCookie.value, secretGuest)
    : null;

  const stepperCookieDecoded = stepperCookie?.value
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
