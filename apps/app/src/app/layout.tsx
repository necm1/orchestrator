import { Inter, Geist_Mono } from 'next/font/google';
import '../styles/app.css';
import {
  SidebarProvider,
  AppSidebar,
  SidebarInset,
  ThemeProvider,
} from '@orchestrator/ui';
import { ApolloWrapper, getUsers } from '@orchestrator/shared';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fontMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export default async function RootLayout({
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
        <ApolloWrapper>
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
        </ApolloWrapper>
      </body>
    </html>
  );
}
