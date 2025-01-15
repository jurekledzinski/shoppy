import { State } from '@/helpers';
import { Controller, UseFormReturn } from 'react-hook-form';

export type PlaceOrderFormInputs = {
  methodPayment: string;
  methodDelivery: string;
  priceDelivery: number;
  timeDelivery: number;
  termsConditions?: boolean;
};

export type PlaceOrderFormProps = {
  Controller: typeof Controller;
  methods: UseFormReturn<PlaceOrderFormInputs, unknown, undefined>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  methodsPayment: string[];
  methodsDelivery: { name: string; price: number; time: number }[];
  titlePayment: string;
  titleDelivery: string;
};
