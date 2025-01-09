"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase/supabase";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";

type Props = {
  setFetch:any;
  isAllowed:boolean
};

export default function CreatePrjct({setFetch,isAllowed}: Props) {
  const [title, setTitle] = useState("");
  const {user} = useUser()

  const createProject = async (e) => {
    e.preventDefault()
    try {
      const{data,error} = await supabase
        .from("study-projects")
        .insert({
             title: title,
             userId:user?.id 


        })
        .select()
        ;
        setFetch(true)
        
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full h-full justify-center flex items-center focus:outline-none "  ><Plus/></DialogTrigger>
      <DialogContent className=" w-max lg:w-full p-5 rounded-md ">
        <DialogHeader className="w-full justify-start flex items-start">
          <DialogTitle>Create A Project</DialogTitle>
        </DialogHeader>
        {isAllowed ?  
        <form 
        onClick={createProject}
        className="w-full flex flex-col  ">
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-3/4 focus:outline-none p-2 border-gray-700 border rounded-md lg:p-4 "
          />
          <DialogTrigger className="w-full flex justify-end ">
            {" "}
            <Button disabled={title.length === 0} className="mt-3">
              Create
            </Button>
          </DialogTrigger>
        </form>:<div>
          <h1 className="text-2xl" >
          Only 2 projects allowed for Free Plan

          </h1>
        </div> }
      </DialogContent>
    </Dialog>
  );
}
