import { getProccedCheckoutData } from '@/lib';
import { PlaceOrderSection } from '@/components/pages';
import { Step, Stepper } from '@/components/shared';
import { steps } from '@/data';

const PlaceOrder = async () => {
  const { completedSteps, orderData } = await getProccedCheckoutData(false);

  return (
    <PlaceOrderSection orderData={orderData ? orderData : null}>
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
