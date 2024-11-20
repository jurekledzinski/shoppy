import { NextResponse } from 'next/server';

export const errorMessage = (status: number, statusText?: string) => {
  return NextResponse.json(
    {},
    {
      status: 409,
      statusText,
    }
  );
};
