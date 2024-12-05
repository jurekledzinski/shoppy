'use client';
import React from 'react';
import { AddToCartButton } from '@/components/shared';
import { AddToCartControllerProps } from './types';

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
