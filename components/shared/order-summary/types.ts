import { Order } from '@/models';

export type OrderSummaryProps = {
  dataOrder: Order | null;
  titleSummary: string;
  methodPayment: string;
  methodDelivery: string;
  priceDelivery: number;
  timeDelivery: number;
  totalPrice: number;
};
