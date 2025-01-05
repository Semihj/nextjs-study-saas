"use client";
import supabase from "@/supabase/supabase";
import { Viewer,Worker  } from '@react-pdf-viewer/core';
import { Document } from 'react-pdf'

import { Send } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TokenError from "../getQuestions/_components/TokenError";
import { GrMoney } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { useUser } from "@clerk/nextjs";

type Props = {};

export default function Ask_To_AI({}: Props) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState();
  const [pdfUrl, setPdfUrl] = useState()
  const [projectData, setProjectData] = useState({})
  const [answer, setAnswer] = useState("");
  const [showTokenError, setShowTokenError] = useState(false)
  const {user} = useUser()
  const params = useParams();
  const {token} = useSelector((state) => state.token)

  const getUrl = async () => {
    try {
      const { data } = await supabase
        .from("study-projects")
        .select("pdfData, gemini ")
        .eq("id",params.id)
        .single()
        ;
        setProjectData({
          url:data.pdfData.url,
          gemini:data.gemini
        })
        
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUrl()
  }, [])
  



  const handleAnswer = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
     if(token >= 10) {

     

      const formData = {
        text: text,
        uri: projectData?.url,
      };
      const res = await fetch(`/api/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      await supabase
      .from("study-projects")
      .update({ token: token - 10 })
      .eq("userId", user?.id)
     

      setAnswer(data.res);
      setLoading(false)
    } else {
      setShowTokenError(true)
      setLoading(false)
    }
  } catch (error) {
      console.log(error);
      setLoading(false)

    }
  };
  return (
    <div className="flex flex-col lg:flex-row w-full py-3  lg:px-5 gap-4 ">
      {showTokenError && <TokenError showTokenError={showTokenError} setShowTokenError={setShowTokenError} /> }
      
      <form onSubmit={handleAnswer} className="flex flex-col w-full h-max lg:border-2 shadow-lg p-2 lg:py-4 ">
        
        <div className="flex w-full gap-2 items-center ">
        <input
          type="text"
          className="border p-3 h-max w-2/3 "
          onChange={(e) => setText(e.target.value)}
        />
        <button className="flex gap-2 items-center" ><IoMdSend className="text-blue-500 text-2xl " />  </button>
        <GrMoney className="text-yellow-500" /><p className="text-xs" >(10)</p> 
        </div>
        {loading && <div>
          <h1 className="text-4xl animate-pulse" >Loading</h1>
        </div> }
        {answer && <p className="mt-4 font-semibold ">{answer} </p>}
      </form>
      <div className="flex flex-col w-full h-full border-2 shadow-lg  ">
        {projectData.url  &&
        
        
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js" >
          <div className="  w-full overflow-y-auto ">
            <Viewer

              
             enableSmoothScroll={true} fileUrl={projectData.url} >

            </Viewer>
          </div>
        </Worker>
        }
      </div>
    </div>
  );
}
