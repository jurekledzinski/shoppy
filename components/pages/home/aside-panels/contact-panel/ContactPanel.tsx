'use client';
import stylesAside from '@/components/shared/aside/Aside.module.css';
import { contact } from '@/actions';
import { ContactForm } from '../../forms';
import { ContactPanelProps } from './types';
import { useActionState } from 'react';
import { useContactForm } from '@/hooks';

export const ContactPanel = ({ onSuccessAction }: ContactPanelProps) => {
  const [stateContact, formActionContact, isPendingContact] = useActionState(
    contact,
    {
      message: '',
      success: false,
    }
  );

  const { methodsContact, onSubmitContact } = useContactForm({
    formAction: formActionContact,
    isPending: isPendingContact,
    isSuccess: stateContact.success,
    onSuccess: () => {
      onSuccessAction(stateContact.message);
    },
  });

  return (
    <>
      <header className={stylesAside.header}>Contact</header>
      <ContactForm
        isPending={isPendingContact}
        methods={methodsContact}
        onSubmit={onSubmitContact}
        state={stateContact}
      />
    </>
  );
};
