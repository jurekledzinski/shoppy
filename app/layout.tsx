import AsideProvider from '@/store/aside';
import CartProvider from '@/store/cart/CartProvider';
import SessionUserProvider from '@/store/session/SessionUserProvider';
import ThemeProvider from '@/store/theme';
import { Oswald, Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/globals.css';
import type { Metadata } from 'next';

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
});

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['300', '400', '500'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Shoppy',
  description: 'Small shop',
};

export default async function RootLayout({
  children,
  header,
  footer,
  aside,
  backdrop,
}: Readonly<{
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  aside: React.ReactNode;
  backdrop: React.ReactNode;
}>) {
  return (
    <html lang="en" className={[oswald.variable, roboto.variable].join(' ')}>
      <ThemeProvider>
        <SessionUserProvider>
          <AsideProvider>
            <CartProvider>
              <body>
                {header}
                {children}
                {footer}
                {aside}
                {backdrop}
                <ToastContainer position="top-right" autoClose={1500} />
              </body>
            </CartProvider>
          </AsideProvider>
        </SessionUserProvider>
      </ThemeProvider>
    </html>
  );
}
