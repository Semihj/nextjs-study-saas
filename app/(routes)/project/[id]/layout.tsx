import React from "react";
import AppSidebar from "./_components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Token from "./_components/Token";

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
       <main className="w-full flex flex-col h-full lg:p-4 ">
        <Token/>
       {children}
       </main>
      </SidebarProvider>
     
    </div>
  );
}
