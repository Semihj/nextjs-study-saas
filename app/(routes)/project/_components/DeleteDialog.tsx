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
import { Trash2 } from "lucide-react";

type Props = {
  id: any;
  setFetch:any
};

export default function DeleteDialog({ id,setFetch
 }: Props) {
 
  

  const deleteProject = async (e) => {
    try {
      const { data, error } = await supabase
        .from("study-projects")
        .delete()
        .eq("id", id)
        ;
        if(error) console.log(error);
        
        setFetch(true)
        
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 className="text-red-600 cursor-pointer " />
      </DialogTrigger>
      <DialogContent className=" w-max lg:w-full p-5 rounded-md bg-black text-white ">
        <DialogHeader className="w-full justify-start flex items-start">
          <DialogTitle className="text-red-700">Delete Project</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-col  ">
          <p>Are you sure you want to delete?</p>
          <div className="w-full flex justify-between items-center ">
            {" "}
            <DialogTrigger>
              <Button className="mt-3">No</Button>
            </DialogTrigger>
            <DialogTrigger>
              <Button
                onClick={deleteProject}
                variant={"destructive"}
                className="mt-3"
              >
                Yes
              </Button>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
