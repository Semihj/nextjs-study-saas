import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from '@/components/ui/sidebar'
import { House, Settings } from 'lucide-react'
import React from 'react'

type Props = {}

export default function HomeSidebar({}: Props) {

  const links = [
    {
      id:1,
      label:"Home",
      icon:House,
      color:"text-red-600",
      link:"/"
    },
    {
      id:2,
      label:"Home",
      icon:House,
      color:"text-red-600",
      link:"/"
    },
    {
      id:3,
      label:"Settings",
      icon:Settings,
      color:"text-black",
      link:"/settings"
    },
  ]


  return (
    <Sidebar className=' '>
      <SidebarContent className='w-full h-full bg-gray-200 ' >
     
      <SidebarGroup className='flex flex-col gap-4 mt-40 ' >
      {links.map((item) => (
        <div className="flex items-center justify-between px-3 py-2 hover:bg-gray-400 hover:border hover:rounded-lg transition-all  " key={item.id}>
          <p className='text-2xl font-semibold text-black' >{item.label} </p>
          <item.icon className={`${item.color} w-8 h-8`} />
        </div>
      ))}
      </SidebarGroup>

      </SidebarContent>
      
    </Sidebar>
  )
}