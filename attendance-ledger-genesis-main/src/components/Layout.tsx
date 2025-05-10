
import React, { useState } from 'react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Calendar, Home, Users, Award, Ticket } from 'lucide-react';
import { WalletConnect } from './WalletConnect';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="flex justify-between items-center px-6 py-4 border-b border-border/20">
            <SidebarTrigger />
            <div className="flex-1 px-4">
              <h1 className="text-xl font-bold gradient-text">DAttend - Decentralized Attendance System</h1>
            </div>
            <WalletConnect />
          </div>
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center gap-2 p-4">
        <div className="web3-glow h-8 w-8 flex items-center justify-center bg-web3-primary rounded-full">
          <span className="text-white font-bold">D</span>
        </div>
        <span className="font-bold text-xl">DAttend</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/" className="flex items-center gap-3">
                <Home size={18} />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/events" className="flex items-center gap-3">
                <Ticket size={18} />
                <span>Events</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/attendance" className="flex items-center gap-3">
                <Calendar size={18} />
                <span>Attendance</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/nfts" className="flex items-center gap-3">
                <Award size={18} />
                <span>NFT Rewards</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/attendees" className="flex items-center gap-3">
                <Users size={18} />
                <span>Attendees</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default Layout;
