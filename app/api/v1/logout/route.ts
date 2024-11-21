import 'server-only';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib';

export const POST = connectDB(async () => {
  const response = NextResponse.json({
    success: true,
  });

  response.cookies.delete('auth');

  return response;
});
