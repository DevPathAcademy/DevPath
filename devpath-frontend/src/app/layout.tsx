import './globals.css';
import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'DevPath',
  description: 'Learn. Build. Launch.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextUIProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
