import React from "react";
import AppSidebar from "./_components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="w-full h-full flex">
      <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger>
      
       </SidebarTrigger> 
       <main className="w-full h-full lg:p-4 ">
       {children}</main>
      </SidebarProvider>
     
    </div>
  );
}
