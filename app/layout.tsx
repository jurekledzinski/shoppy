import ThemeProvider from '@/store/theme';
import '@styles/globals.css';
import type { Metadata } from 'next';

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
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
