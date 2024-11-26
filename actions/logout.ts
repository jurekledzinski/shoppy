'use client';
import { redirect } from 'next/navigation';
import { actionTryCatch } from '@/helpers';

export const logout = actionTryCatch(async () => {
  const res = await fetch('/api/v1/logout', {
    body: JSON.stringify({}),
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  redirect('/');
});
