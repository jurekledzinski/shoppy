import { State } from '@/helpers';
import { UseFormReturn } from 'react-hook-form';
import { ContactFormInputs } from '../../forms';

export type ContactPanelProps = {
  isPending: boolean;
  methods: UseFormReturn<ContactFormInputs, unknown, undefined>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
};
