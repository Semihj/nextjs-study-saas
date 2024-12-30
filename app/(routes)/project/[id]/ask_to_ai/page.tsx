"use client";
import supabase from "@/supabase/supabase";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type Props = {};

export default function Ask_To_AI({}: Props) {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const params = useParams();

  const handleAnswer = async () => {
    try {
      const { data: project } = await supabase
        .from("study-projects")
        .select("pdfData")
        .eq("id", params.id)
        .single();
      console.log(project);

      const formData = {
        text: text,
        uri: project?.pdfData.url,
      };
      const res = await fetch(`/api/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setAnswer(data.res);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col lg:flex-row w-full py-3 px-1 lg:px-5 gap-4 ">
      <div className="flex flex-col w-full border-2 shadow-lg  ">
        <input
          type="text"
          className="border p-3 w-2/3 "
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleAnswer}>Submit</button>
        {answer && <p className="mt-4 font-semibold ">{answer} </p>}
      </div>
      <div className="flex flex-col w-full border-2 shadow-lg  "></div>
    </div>
  );
}
