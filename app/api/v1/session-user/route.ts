import 'server-only';
import { auth } from '@/auth';

export const GET = auth(async (request) => {
  const cookieGuest = request.cookies.get('guestId')!;
  const cookieStepper = request.cookies.get('stepper')!;
  const userSession = request.auth;
  console.log('get userSession api route', userSession);
  console.log('get cookieGuest api route', cookieGuest);
  console.log('get cookieStepper api route', cookieStepper);
  return Response.json({ success: true, payload: {} });
});
