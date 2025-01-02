import { SidebarProvider, SidebarTrigger } from "shadcn/ui/components/ui/sidebar"
import DashboardSidbar from "components/DashboardSidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <DashboardSidbar />
      <main>
        {children}
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  )
}
