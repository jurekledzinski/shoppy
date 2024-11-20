import ThemeProvider from '@/store/theme';
import AsideProvider from '@/store/aside';
import type { Metadata } from 'next';
import { Oswald, Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@styles/globals.css';

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

export default function RootLayout({
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
        <AsideProvider>
          <body>
            {header}
            {children}
            {footer}
            {aside}
            {backdrop}
            <ToastContainer position="top-right" autoClose={1500} />
          </body>
        </AsideProvider>
      </ThemeProvider>
    </html>
  );
}
