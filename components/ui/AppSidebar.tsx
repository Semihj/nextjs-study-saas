"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { MdNoteAdd } from "react-icons/md";
import { RiQuestionnaireFill } from "react-icons/ri";
import { FaUserPlus } from "react-icons/fa";
import { BsFiletypePdf } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { handleUploadAI } from "@/lib/gemini/handleUploadAı";
import supabase from "@/supabase/supabase";
import { nanoid } from "@reduxjs/toolkit";

type Props = {};

export default function AppSidebar({}: Props) {
  const [file, setFile] = useState<any>([]);
  console.log(JSON.stringify(file[0]));
  console.log(file[0]);

  const sidebarLinks = [
    {
      id: 1,
      label: "Upload PDF",
      icon: BsFiletypePdf,
      color: "text-red-500",
    },
    {
      id: 2,
      label: "Ask Questions",
      icon: RiQuestionnaireFill,
      color: "text-blue-500",
    },
    {
      id: 3,
      label: "Prepare Questions",
      icon: MdNoteAdd,
      color: "text-green-500",
    },
    {
      id: 4,
      label: "Invite Friends",
      icon: FaUserPlus,
      color: "text-purple-500",
    },
  ];

  const handleAI = async (e) => {
    e.preventDefault();
    console.log(file);
    try {
      if (file.length > 0) {
        const name = nanoid() + ".pdf";
        const { data: storageData, error } = await supabase.storage
          .from("pdfs")
          .upload(name, file[0]);

        const { data: pdfData } = await supabase.storage
          .from("pdfs")
          .getPublicUrl(name);
        console.log(pdfData);
        const url = pdfData.publicUrl;

        const { data: spData } = await supabase
          .from("study-projects")
          .insert({
            pdfData: { ...storageData, url },
          })
          .select();

        const fileData = {
          url: url,
          path: name,
        };
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(fileData),
        });
        const data = await res.json();
        console.log(data);
        
        await supabase
          .from("study-projects")
          .update({ gemini: data.file })
          .eq("id", spData[0].id);

      } else {
        return console.log("there is no file");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className=" w-20 lg:w-[300px] h-screen border-r-2 bg-slate-200 flex flex-col p-4 transition-all duration-300  ">
      <div className="flex w-full mb-10 justify-between items-center gap-1 ">
        <div className="text-2xl w-full leading-3 items-center cursor-pointer p-2 py-4 flex justify-between border rounded-full shadow-lg hover:brightness-75 transition-all bg-white text-black ">
          <span className=" ">New Project</span>
        </div>
        <div className="bg-white hover:brightness-75 transition-all cursor-pointer rounded-full p-2 ">
          <Plus />
        </div>
      </div>
      <div className="lg:flex flex-col w-full hidden ">
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files);
          }}
        />
        <div
          className="w-[140px] h-[140px] bg-gray-400 rounded-md shadow-lg "
          onClick={handleAI}
        ></div>
        <div className="flex flex-col  mt-4 ">
          <h2 className="text-2xl">Semih S.</h2>
          <p className="text-gray-500 text-lg">@semihs</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        {sidebarLinks.map((item) => (
          <div
            className="flex p-2 text-xl items-center justify-between rounded-md hover:bg-white/80 transition-all   "
            key={item.id}
          >
            <h1> {item.label} </h1>
            <item.icon className={cn("h-8 w-8", item.color)} />
          </div>
        ))}
      </div>
    </div>
  );
}
