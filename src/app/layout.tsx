// src/app/layout.tsx (서버 컴포넌트)
import { ThemeProvider } from '@/modules/theme/ThemeProvider';
import { Providers } from '@/components/Providers';
import '../styles/globals.css';
import { Header, Footer } from '@/components';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" suppressHydrationWarning>
              <body>
          <ThemeProvider>
            <Providers>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex min-h-0 flex-1 flex-col h-full">{children}
                </main>
                <Footer />
              </div>
            </Providers>
          </ThemeProvider>
        </body>
    </html>
  );
};

export default RootLayout;
