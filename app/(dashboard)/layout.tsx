import { DesktopSidebar, MobileSidebarTrigger } from "./dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1">
      <DesktopSidebar />
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <div className="flex items-center gap-3 border-b px-4 py-3 lg:hidden">
          <MobileSidebarTrigger />
          <span className="text-sm font-medium">Menu</span>
        </div>
        {/* Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
