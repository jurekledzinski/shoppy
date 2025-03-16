import { DetailsOrderSection } from '@/components/pages';
import { getProccedCheckoutData } from '@/lib';
import { Step, Stepper } from '@/components/shared';
import { steps } from '@/data';

const DetailsOrder = async () => {
  const { completedSteps, guestId, orderData, userData } =
    await getProccedCheckoutData(true);

  return (
    <DetailsOrderSection
      orderData={orderData ? orderData : null}
      guestSession={guestId ? guestId : null}
      userSession={userData ? userData._id! : null}
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
    </DetailsOrderSection>
  );
};

export default DetailsOrder;
