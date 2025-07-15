// src/app/layout.tsx (서버 컴포넌트)
import { ThemeProvider } from '@/modules/theme/ThemeProvider';

import '../styles/globals.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Header, Footer } from '@/components';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex min-h-0 flex-1 flex-col">
              <div className="flex h-full flex-1">{children}</div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
