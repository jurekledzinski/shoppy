import { auth } from '@/auth';
import { cookies, headers } from 'next/headers';
import { fetchOrder, fetchUser, getDomain } from '../_helpers';
import { ShippingSection } from '@/components/pages';
import { Step, Stepper } from '@/components/shared';
import { steps } from '@/data';
import { verifyToken } from '@/lib';

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

  const guestCookieDecoded = guestCookie?.value
    ? await verifyToken<{ value: string }>(guestCookie.value, secretGuest)
    : null;

  const stepperCookieDecoded = stepperCookie?.value
    ? await verifyToken<{ value: { allowed: string; completed: string[] } }>(
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
