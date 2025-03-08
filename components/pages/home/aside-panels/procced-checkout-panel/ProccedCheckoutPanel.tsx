'use client';
import stylesAside from '@/components/shared/aside/Aside.module.css';
import stylesButton from '@styles/buttons.module.css';
import stylesProccedPanel from './ProccedCheckoutPanel.module.css';
import { useState } from 'react';
import { classNames } from '@/helpers';

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  Button,
  Loader,
} from '@/components/shared';
import { ProccedCheckoutPanelProps } from './types';

export const ProccedCheckoutPanel = ({
  isPending,
  onCancel,
  onContinue,
}: ProccedCheckoutPanelProps) => {
  const [selectedValue, setSelectedValue] = useState('login');

  return (
    <>
      <header className={stylesAside.header}>Choose option to procced</header>
      <div className={stylesProccedPanel.container}>
        <Accordion>
          <AccordionHeader
            checked={selectedValue === 'register'}
            name="register"
            title="Register"
            onChange={(e) => setSelectedValue(e.target.value)}
          />
          <AccordionContent active={selectedValue === 'register'}>
            <p>
              Creating an account allows you to save your details for faster
              checkout next time.
            </p>
          </AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionHeader
            checked={selectedValue === 'login'}
            name="login"
            title="Login"
            onChange={(e) => setSelectedValue(e.target.value)}
          />
          <AccordionContent active={selectedValue === 'login'}>
            <p>
              Log in to access your saved information and complete your
              purchase.
            </p>
          </AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionHeader
            checked={selectedValue === 'guest'}
            name="guest"
            title="Guest"
            onChange={(e) => setSelectedValue(e.target.value)}
          />
          <AccordionContent active={selectedValue === 'guest'}>
            <p>You can complete your purchase without creating an account.</p>
          </AccordionContent>
        </Accordion>
        <Button
          className={classNames(stylesButton.buttonConfirmFullWidth)}
          disabled={isPending}
          text="Continue"
          onClick={() => onContinue(selectedValue)}
        >
          {isPending && <Loader />}
        </Button>
        <Button
          className={classNames(stylesButton.buttonCancelFullWidth)}
          disabled={isPending}
          text="Cancel"
          onClick={onCancel}
        />
      </div>
    </>
  );
};
