import ThemeProvider from '@/store/theme';
import '@styles/globals.css';
import type { Metadata } from 'next';
import {
  Footer,
  Header,
  CartButton,
  MenuButton,
  ThemeButton,
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
        <body>
          <Header>
            <ThemeButton />
            <CartButton />
            <MenuButton />
          </Header>
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
