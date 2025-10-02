import { Inter, Geist_Mono } from 'next/font/google';
import '../styles/app.css';
import {
  SidebarProvider,
  AppSidebar,
  SidebarInset,
  ThemeProvider,
} from '@orchestrator/ui';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* <div className="min-h-svh flex flex-col">{children}</div> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
