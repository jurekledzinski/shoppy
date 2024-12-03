'use client';
import React from 'react';
import { AddToCartControllerProps } from './types';
import { AddToCartButton } from '@/components/shared';

export const AddToCartController = ({ data }: AddToCartControllerProps) => {
  return (
    <React.Fragment>
      <AddToCartButton
        onClick={() => {
          console.log('add to cart', data);
        }}
      />
    </React.Fragment>
  );
};
