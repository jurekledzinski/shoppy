'use client';
import stylesAside from '@/components/shared/aside/Aside.module.css';
import stylesProccedPanel from './ProccedCheckoutPanel.module.css';
import { ButtonGroup } from '@/components/shared';
import { ProccedCheckoutPanelProps } from './types';
import { useState } from 'react';

import {
  Accordion,
  Button,
  AccordionContent,
  AccordionHeader,
} from '@/components/shared';

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
        <div className={stylesProccedPanel.wrapper}>
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
        </div>
        <ButtonGroup
          fullWidth={true}
          orientation="column"
          spacing="tight"
          marginTop={8}
        >
          <Button
            fullWidth={true}
            disabled={isPending}
            isLoading={isPending}
            label="Continue"
            onClick={() => onContinue(selectedValue)}
            radius={2}
          />
          <Button
            color="secondary"
            fullWidth={true}
            disabled={isPending}
            label="Cancel"
            onClick={onCancel}
            variant="outlined"
            radius={2}
          />
        </ButtonGroup>
      </div>
    </>
  );
};
