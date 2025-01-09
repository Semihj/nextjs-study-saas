"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { DialogContent } from "@radix-ui/react-dialog";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import DialogComp from "./_components/DialogComp";
import supabase from "@/supabase/supabase";
import DeleteDialog from "./_components/DeleteDialog";
import EditDialog from "./_components/EditDialog";
import Link from "next/link";

type Props = {};

export default function ProjectPage({}: Props) {
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [fetch, setFetch] = useState(true);

  const getProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("study-projects")
        .select("id,title,created_at")
        .eq("userId".toString(), user?.id.toString())
        .order("created_at", {
          ascending: false,
        });

      setProjects(data);
      setFetch(false);
    } catch (error) {
      console.log(error);
      setFetch(false);
    }
  };

  if (fetch && user) {
    getProjects();
  }
  /*  useEffect(() => {
    getProjects();
  }, [user]); */

  return (
    <div className="w-full h-full flex flex-col  lg:flex-row lg:px-20 lg:py-20 p-4 gap-4  ">
      <div className="border w-full flex flex-col lg:w-1/3 h-full p-4 ">
        <Image
          src={user?.imageUrl || ""}
          alt=""
          width={200}
          height={200}
          className="w-2/3 h-40 rounded-md border bg-gray-600 object-cover object-center "
        />
        <p className="font-semibold text-gray-500 text-2xl mt-3">
          {user?.fullName}{" "}
        </p>
        <DialogComp isAllowed={projects.length < 2} setFetch={setFetch} />
      </div>
      <div className="border w-full flex flex-col min-h-[500px] gap-3 p-4 ">
        <h1 className="font-semibold text-3xl">Projects</h1>
        <div className="w-full flex flex-wrap gap-5">
          {projects.length > 0 &&
            projects.map((project) => (
              <div
                className="border-2 shadow-lg w-full max-w-[300px] flex flex-col justify-between  h-[240px] p-3  "
                key={project.id}
              >
                <Link
                  href={`/project/${project?.id}/upload `}
                  className="font-semibold text-3xl cursor-pointer "
                >
                  {" "}
                  {project.title}
                </Link>
                <div className="w-full  flex justify-between ">
                  <p className="italic text-gray-600 ">22/05/2024</p>
                  <div className="flex gap-2">
                    <EditDialog
                      id={Number(project?.id)}
                      setFetch={setFetch}
                      title={project?.title}
                    />
                    <DeleteDialog
                      setFetch={setFetch}
                      id={Number(project?.id)}
                    />
                  </div>
                </div>
              </div>
            ))}{" "}
        </div>
      </div>
    </div>
  );
}
