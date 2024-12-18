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
} from '@/components/shared';
import { ProccedCheckoutPanelProps } from './types';

export const ProccedCheckoutPanel = ({
  onCancelAction,
  onChooseOptionAction,
}: ProccedCheckoutPanelProps) => {
  const [open, setOpen] = useState<Record<string, boolean>>({
    register: false,
    login: true,
    guest: false,
  });

  return (
    <>
      <header className={stylesAside.header}>Choose option to procced</header>
      <div className={stylesProccedPanel.container}>
        <Accordion>
          <AccordionHeader
            name="register"
            title="Register"
            onChange={(e) => {
              setOpen({
                [e.target.value]: true,
                login: false,
                guest: false,
              });
            }}
          />
          <AccordionContent active={open['register']}>
            <p>
              Creating an account allows you to save your details for faster
              checkout next time.
            </p>
          </AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionHeader
            name="login"
            title="Login"
            onChange={(e) => {
              setOpen({
                [e.target.value]: true,
                register: false,
                guest: false,
              });
            }}
          />
          <AccordionContent active={open['login']}>
            <p>
              Log in to access your saved information and complete your
              purchase.
            </p>
          </AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionHeader
            name="guest"
            title="Guest"
            onChange={(e) => {
              setOpen({
                [e.target.value]: true,
                register: false,
                login: false,
              });
            }}
          />
          <AccordionContent active={open['guest']}>
            <p>You can complete your purchase without creating an account.</p>
          </AccordionContent>
        </Accordion>
        <Button
          className={classNames(stylesButton.buttonConfirmFullWidth)}
          disabled={false}
          text="Continue"
          onClick={() => {
            const selected = Object.entries(open).find((value) => value[1]);
            if (!selected) return;
            const option = selected[0];
            onChooseOptionAction(option)
            console.log('selected', option);
          }}
        />
        <Button
          className={classNames(stylesButton.buttonCancelFullWidth)}
          disabled={false}
          text="Cancel"
          onClick={onCancelAction}
        />
      </div>
    </>
  );
};
