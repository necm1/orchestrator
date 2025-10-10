import { SidebarProvider, AppSidebar, SidebarInset } from '@orchestrator/ui';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
