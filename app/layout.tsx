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
    <html lang="en">
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
          </body>
        </AsideProvider>
      </ThemeProvider>
    </html>
  );
}
