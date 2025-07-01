// src/app/layout.tsx (서버 컴포넌트)
import { ThemeProvider } from '@/modules/theme/ThemeProvider';

import '../styles/globals.css';
import { Header, Footer } from '@/components';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex sm:min-h-screen h-screen flex-col">
            <Header />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
