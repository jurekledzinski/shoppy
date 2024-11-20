import ThemeProvider from '@/store/theme';
import AsideProvider from '@/store/aside';
import '@styles/globals.css';
import type { Metadata } from 'next';
import {
  Footer,
  Header,
  CartButton,
  MenuButton,
  ThemeButton,
  Aside,
  Backdrop,
} from '@/components/shared';
import { Oswald, Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={[oswald.variable, roboto.variable].join(' ')}>
      <ThemeProvider>
        <AsideProvider>
          <body>
            <Header>
              <ThemeButton />
              <CartButton />
              <MenuButton />
            </Header>
            {children}
            <Footer />
            <Aside />
            <Backdrop />
            <ToastContainer
              position="top-right"
              theme="dark"
              autoClose={1500}
            />
          </body>
        </AsideProvider>
      </ThemeProvider>
    </html>
  );
}
