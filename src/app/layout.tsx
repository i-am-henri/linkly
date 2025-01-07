import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type React from 'react';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'linkly',
  description: 'A free and open-source link shortener.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.className}  flex min-h-screen w-full bg-background justify-center`}
      >
        <Toaster richColors />
        <div className="space-y-16 py-16 md:py-32 w-full px-5 sm:px-5 sm:w-[450px] md:w-[500px] lg:w-[600px]">
          {children}
        </div>
      </body>
    </html>
  );
}
