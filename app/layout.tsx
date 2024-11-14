import ThemeProvider from '@/store/theme';
import '@styles/globals.css';
import type { Metadata } from 'next';
import { Footer, Header } from '@/components/shared';

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
        <body data-theme="light">
          <Header>Nav</Header>
          {children}
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
