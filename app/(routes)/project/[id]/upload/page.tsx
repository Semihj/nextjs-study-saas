"use client";

import { Button } from "@/components/ui/button";
import supabase from "@/supabase/supabase";
import { nanoid } from "@reduxjs/toolkit";
import { ImagePlus } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Viewer,Worker  } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useDropzone } from "react-dropzone";

type Props = {};

export default function UploadPage({}: Props) {
  const [file, setFile] = useState({});
  const [project, setProject] = useState({  });
  console.log(file);
  const inputRef = useRef();
  const params = useParams();
  const onDrop = useCallback((acceptedFile) => {
    setFile(acceptedFile);
    console.log(acceptedFile);
  }, []);
  console.log(project);
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const handleAI = async (e) => {
    e.preventDefault();
    console.log(file);
    try {
      if (file) {
        const name = nanoid() + ".pdf";
        const { data: storageData } = await supabase.storage
          .from("pdfs")
          .upload(name, file);
        console.log(storageData);

        const { data: pdfData } = await supabase.storage
          .from("pdfs")
          .getPublicUrl(name);
        console.log(pdfData);
        const url = pdfData.publicUrl;

        const { data: spData } = await supabase
          .from("study-projects")
          .update({
            pdfData: { url },
          })
          .eq("id", params.id)
          .select();
        console.log(spData);
      } else {
        return console.log("there is no file");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  
useEffect(() => {
  const getProject = async () => {
    try {
      const { data, error } = await supabase
        .from("study-projects")
        .select("pdfData")
        .eq("id", params.id);

      if (error) {
        console.error('Error fetching project:', error);
        // Handle error gracefully, e.g. display an error message to the user
      } else if (data) {
        setProject(data[0]); // Assuming the data is an array with a single object
      } else {
        console.log('Project not found');
        // Handle the case where no project is found with the given ID
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      // Handle unexpected errors
    }
  };

  getProject();
}, []);
 
return (
    <div className="w-full h-full min-h-screen  ">
      {project?.pdfData ? (
        <div className="w-full h-full flex justify-center items-center text-3xl lg:text-5xl font-semibold  ">
         <h1 className="max-w-md text-center  " > There is Already a PDF Uploaded
        </h1></div>
      ) : (
        <div className="w-full h-full ">
          {file?.name ? (
            <div className="w-full h-full flex justify-center items-center ">
              <Button className="mt-10  " onClick={handleAI}>
                Submit{" "}npm install @react-pdf-viewer/core
              </Button>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center ">
              <input
                {...getInputProps()}
                type="file"
                hidden
                accept="application/pdf"
                ref={inputRef}
                onChange={(e) => setFile(e.target.files[0])}
                multiple
              />
              <div
                {...getRootProps()}
                className="flex flex-col w-full h-full items-center justify-center "
                onClick={() => inputRef.current.click()}
              >
                <ImagePlus />
                <h1>Drag and Drop</h1>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
