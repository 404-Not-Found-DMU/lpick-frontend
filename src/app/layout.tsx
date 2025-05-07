// app/layout.tsx
import { ReactNode } from 'react';

export const metadata = {
  title: 'LPick',
  description: 'LP 및 음향 커뮤니티 플랫폼',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <h1>헤더</h1>
        {children}
        <h1>푸터</h1>
      </body>
    </html>
  );
}
