import styles from './OrdersList.module.css';
import stylesAccordionContent from '@/components/shared/accordion/Accordion.module.css';
import { NoData } from '@/components/shared';
import { OrdersListProps } from './types';

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
} from '@/components/shared';
import {
  OrderAddress,
  OrderDate,
  OrderStatus,
  OrderDelivery,
  OrderPayment,
  OrderTerms,
  OrderProducts,
  OrderSummary,
} from '@/components/pages';

export const OrdersList = ({
  onSelectValue,
  ordersData,
  selectedValue,
}: OrdersListProps) => {
  return (
    <>
      {ordersData && ordersData?.length ? (
        ordersData.map((order) => (
          <Accordion key={order._id}>
            <AccordionHeader
              checked={selectedValue === order._id}
              name={order._id!}
              title={`Order id: ${order._id}`}
              onClick={(id) => onSelectValue(id)}
            />
            <AccordionContent
              active={selectedValue === order._id}
              className={stylesAccordionContent.contentOrders}
            >
              <div className={styles.container}>
                <OrderAddress className={styles} ordersData={order} />
                <OrderDate className={styles} ordersData={order} />
                <OrderStatus className={styles} ordersData={order} />
                <OrderDelivery className={styles} ordersData={order} />
                <OrderPayment className={styles} ordersData={order} />
                <OrderTerms className={styles} ordersData={order} />
                <OrderProducts className={styles} ordersData={order} />
                <OrderSummary className={styles} ordersData={order} />
              </div>
            </AccordionContent>
          </Accordion>
        ))
      ) : (
        <NoData
          text="At the moment you didn't order anything."
          title="No orders"
        />
      )}
    </>
  );
};
