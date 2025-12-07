import { Cart, Order } from '@/models';
import { State } from '@/helpers';
import { TermsConditionsFormInputs } from '../terms-conditions-form';
import { UseFormReturn } from 'react-hook-form';

export type DetailsOrderProps = {
  cartData: Cart | null;
  dataOrder: Order | null;
  methods: UseFormReturn<TermsConditionsFormInputs, unknown, TermsConditionsFormInputs>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
  titlePayment: string;
  titleDelivery: string;
  titleAddress: string;
  titleOrders: string;
  titleSummary: string;
};
