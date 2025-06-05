// src/app/layout.tsx

import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import { Header } from '@/components/Layout/Header';
import { Footer } from '@/components/Layout/Footer';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head></head>
      <body>
        <ThemeProvider attribute="class">
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>

            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};
