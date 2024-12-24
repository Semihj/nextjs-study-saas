"use client";
import supabase from "@/supabase/supabase";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type Props = {};

export default function Home({}: Props) {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const params = useParams()

  const handleAnswer = async () => {

    try {
        const project = await supabase
        .from("study-projects")
        .select("gemini")
        .eq("id",params.id)
        console.log(project);
        
        const formData = {
            text:text,
            uri:"https://generativelanguage.googleapis.com/v1beta/files/t8aa3auu3enf",
        }
        const res = await fetch("/api/20", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
        })
        const data = await res.json()
        setAnswer(data.res)
        console.log(data);

        
    } catch (error) {
        console.log(error);
        
    }
  }
  return (
    <div className="flex w-full p-3 gap-4 ">
      <div className="flex flex-col w-full border-2 shadow-lg  ">
        <input type="text" className="border p-3 w-2/3 " onChange={(e) => setText(e.target.value) } />
        <button onClick={handleAnswer} >Submit</button>
        {answer && <p className="mt-4 font-semibold ">{answer} </p>}
        
      </div>
      <div className="flex flex-col w-full border-2 shadow-lg  "></div>
    </div>
  );
}
