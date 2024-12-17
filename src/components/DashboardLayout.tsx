import React from "react";
import { Menu, MapPin, Calendar, Bell, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-muted">
      {/* Top Navigation */}
      <header className="bg-primary p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:bg-primary/50"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-bold">FUTURE FARM AI</h1>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-primary/50">
          <Bell className="h-6 w-6" />
        </Button>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <nav
          className={cn(
            "bg-white w-64 border-r transition-all duration-300 flex flex-col",
            isMobile && "fixed inset-y-0 z-50",
            isMobile && !sidebarOpen && "-translate-x-full"
          )}
        >
          <div className="flex flex-col gap-2 p-4">
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <MapPin className="h-5 w-5" />
              Map View
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <Calendar className="h-5 w-5" />
              Schedule
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => isMobile && setSidebarOpen(false)}
            >
              <Settings className="h-5 w-5" />
              Settings
            </Button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};