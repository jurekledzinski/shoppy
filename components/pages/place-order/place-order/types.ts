import { Controller, UseFormReturn } from 'react-hook-form';
import { Order } from '@/models';
import { PlaceOrderFormInputs } from '../place-order-form';
import { State } from '@/helpers';

export type PlaceOrderProps = {
  Controller: typeof Controller;
  dataOrder: Order | null;
  methods: UseFormReturn<PlaceOrderFormInputs, unknown, undefined>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  state: State;
  isPending: boolean;
  methodsPayment: string[];
  methodsDelivery: { name: string; price: number; time: number }[];
  titlePayment: string;
  titleDelivery: string;
  titleAddress: string;
  titleOrders: string;
  titleSummary: string;
  textSubmit: string;
};
