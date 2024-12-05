import stylesAside from '@components/shared/aside/Aside.module.css';
import { ContactForm } from '../../forms';
import { ContactPanelProps } from './types';

export const ContactPanel = ({
  isPending,
  methods,
  onSubmit,
  state,
}: ContactPanelProps) => {
  return (
    <>
      <header className={stylesAside.header}>Contact</header>
      <ContactForm
        isPending={isPending}
        methods={methods}
        onSubmit={onSubmit}
        state={state}
      />
    </>
  );
};
