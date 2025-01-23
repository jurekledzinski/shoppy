import { State } from '@/lib';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { ChangePasswordFormInputs, UpdateProfileFormInputs } from '../forms';

type Action = {
  state: State<unknown>;
  formAction: (payload: FormData | null) => void;
  isPending: boolean;
};
type CallbackSubmit = (e?: React.BaseSyntheticEvent) => Promise<void>;
type Method<T extends FieldValues> = UseFormReturn<T, unknown, undefined>;

export type ProfileControlProps = {
  actionDelete: Action;
  actionProfile: Action;
  actionPassword: Action;
  methodsUpdateProfile: Method<UpdateProfileFormInputs>;
  methodsChangePassword: Method<ChangePasswordFormInputs>;
  onClearCart: () => void;
  onSubmitUpdateProfile: CallbackSubmit;
  onSubmitChangePassword: CallbackSubmit;
  onRedirectSuccess: () => void;
  resetStateActionDelete: (formData?: FormData) => void;
};
