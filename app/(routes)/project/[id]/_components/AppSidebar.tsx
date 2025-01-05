"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { MdNoteAdd } from "react-icons/md";
import { RiQuestionnaireFill } from "react-icons/ri";
import { BsFiletypePdf } from "react-icons/bs";
import { cn } from "@/lib/utils";
import supabase from "@/supabase/supabase";
import { nanoid } from "@reduxjs/toolkit";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreatePrjct from "./CreatePrjct";
import Image from "next/image";

type Props = {};

export default function AppSidebar({}: Props) {
  const {user:clerkUser} = useUser()
  const [file, setFile] = useState<any>([]);
  const [project, setProject] = useState({});
  const [allProjects, setAllProjects] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [showProjects, setShowProjects] = useState(false);
  const { user } = useUser();
  const params = useParams();

  const getProject = async () => {
    try {
      const { data, error } = await supabase
        .from("study-projects")
        .select("title, id")
        .eq("id", params.id);

      setProject(data[0]);
      return data[0];
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("study-projects")
        .select("title,id")
        .eq("userId", user?.id)
        .order("created_at", {
          ascending: false,
        });
      const selectedProject = await getProject();

      const newAllProjects = data.filter(
        (prjct) => prjct.id != selectedProject.id
      );
      setAllProjects([selectedProject, ...newAllProjects]);
      setFetch(false);
    } catch (error) {
      console.log(error);
      setFetch(false);
    }
  };

  const sidebarLinks = [
    {
      id: 1,
      label: "Upload PDF",
      link: "/upload",
      icon: BsFiletypePdf,
      color: "text-red-500",
    },
    {
      id: 2,
      label: "Ask Questions",
      link: "/ask_to_ai",
      icon: RiQuestionnaireFill,
      color: "text-blue-500",
    },
    {
      id: 3,
      label: "Prepare Questions",
      link: "/getQuestions",
      icon: MdNoteAdd,
      color: "text-green-500",
    },
  ];

 
  if (fetch) {
    getAllProjects();
  }
  /*   useEffect(() => {

    getAllProjects();
  }, []);
 */

  return (
    <Sidebar className=" ">
      <SidebarContent className="w-full lg:w-[300px] h-screen border-r-2 bg-slate-200 flex flex-col p-4 transition-all duration-300 ">
        <div className="flex w-full mb-10 justify-between items-center gap-1 transition-all ">
          <div
            className={`text-2xl w-full leading-3  cursor-pointer gap-3  flex flex-col border 
              rounded-md shadow-lg
             ${!showProjects && " rounded-full shadow-lg hover:brightness-75"} 
                transition-all bg-white text-black`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full items-start flex border h-full p-2 py-4">
                {project.title}{" "}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full flex bg-white flex-col ">
                {allProjects.map((prjct: any) => (
                  <Link
                    href={`/project/${prjct.id}/upload `}
                    className={`w-full bg-white p-2 hover:brightness-75 transition-all rounded-md ${
                      prjct.id == project.id && "font-semibold brightness-75 "
                    } `}
                    key={prjct.id}
                  >
                    {prjct.title}
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="bg-white hover:brightness-75 transition-all cursor-pointer rounded-full p-2 ">
            <CreatePrjct setFetch={setFetch} />
          </div>
        </div>
        <div className="lg:flex flex-col w-full ">
      
          <Image
            src={clerkUser?.imageUrl || ""}
            alt="image"
            width={100}
            height={100}
            className="w-[140px] h-[140px] bg-gray-400 rounded-md shadow-lg "
          ></Image>
          <div className="flex flex-col  mt-4 ">
            <h2 className="text-2xl">Semih S.</h2>
            <p className="text-gray-500 text-lg">@semihs</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          {sidebarLinks.map((item) => (
            <Link
              href={`/project/${params.id}/${item.link} `}
              className="flex p-2 text-xl items-center justify-between rounded-md hover:bg-white/80 transition-all   "
              key={item.id}
            >
              <h1> {item.label} </h1>
              <item.icon className={cn("h-8 w-8", item.color)} />
            </Link>
          ))}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
