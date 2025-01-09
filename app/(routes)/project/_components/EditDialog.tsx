import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase/supabase";
import { SquarePen } from "lucide-react"; // Optional import

type Props = {
  id: any;
  title: any;
  setFetch:any
};

export default function EditDialog({ id, title ,setFetch}: Props) {
  const [projectTitle, setProjectTitle] = useState(title);

  const editProject = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("study-projects")
        .update({ title: projectTitle }) // Update with projectTitle state
        .eq("id", id)
        .select();
      setFetch(true)
    } catch (error) {
      console.error("Error updating project:", error);
      // You can display an error message to the user here
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <SquarePen className="cursor-pointer" /> {/* Optional icon */}
      </DialogTrigger>
      <DialogContent className="w-max lg:w-full p-5 rounded-md ">
          <DialogTitle>Edit Project</DialogTitle>
        <form onSubmit={editProject} className="w-full flex flex-col ">
          <input
            placeholder="Title"
            defaultValue={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            className="w-3/4 focus:outline-none p-2 border-gray-700 border rounded-md lg:p-4 "
          />
          <DialogTrigger className="w-full flex justify-end ">
            <Button disabled={projectTitle.length === 0} className="mt-3">
              Edit
            </Button>
          </DialogTrigger>
        </form>
      </DialogContent>
    </Dialog>
  );
}