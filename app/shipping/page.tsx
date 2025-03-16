import { getProccedCheckoutData } from '@/lib';
import { ShippingSection } from '@/components/pages';
import { Step, Stepper } from '@/components/shared';
import { steps } from '@/data';

const Shipping = async () => {
  const { guestId, completedSteps, orderData, userData } =
    await getProccedCheckoutData(true);

  return (
    <ShippingSection
      guestId={guestId ? guestId : null}
      orderData={orderData ? orderData : null}
      userData={userData ? userData : null}
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
