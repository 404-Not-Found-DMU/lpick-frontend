// src/app/layout.tsx (서버 컴포넌트)
import { ThemeProvider } from '@/modules/theme/ThemeProvider';

import '../styles/globals.css';
import { Header, Footer } from '@/components';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex flex-1 flex-col min-h-0">
              <div className="flex-1 h-full flex">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
