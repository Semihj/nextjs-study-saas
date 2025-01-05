"use client";

import { Button } from "@/components/ui/button";
import supabase from "@/supabase/supabase";
import { nanoid } from "@reduxjs/toolkit";
import { ImagePlus } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useDropzone } from "react-dropzone";

type Props = {};

export default function UploadPage({}: Props) {
  const [file, setFile] = useState({});
  const [project, setProject] = useState({});
  const [loading, setLoading] = useState(false)
  console.log(file);
  const inputRef = useRef();
  const params = useParams();
  const onDrop = useCallback((acceptedFile) => {
    // Check if file size is less than 10MB
    if (acceptedFile[0].size < 10 * 1024 * 1024) {
      setFile(acceptedFile[0]);
      console.log(acceptedFile);
    } else {
       return alert("File size exceeds the limit of 10MB");
    }
  }, []);
  console.log(project);
  

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });
  const handleAI = async (e) => {
    e.preventDefault()
    console.log(file)
    setLoading(true)
    try {
      
      if (file && file.size  < 10 * 1024 * 1024 ) {
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

         await supabase
          .from("study-projects")
          .update({
            pdfData: { url },
          })
          .eq("id", params.id)
          .select();
        setLoading(false)

      } else {
       alert("File Can't be more than 10MB")
       setFile({})
       setLoading(false)

      }
    } catch (error) {
      console.log({ error })
      setLoading(false)

      
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
  if(!project.pdfData && !loading ) {
     getProject();
  }
 
}, [loading]);
 
return (
    <div className="w-full h-full min-h-screen  ">
      {loading && <div className="w-full h-screen flex justify-center items-center ">
        <h1 className="text-3xl lg:text-5xl animate-pulse font-semibold" >Loading</h1>
      </div> }
      {project?.pdfData && !loading ? (
        <div className="w-full h-full flex justify-center items-center text-3xl lg:text-5xl font-semibold  ">
         <h1 className="max-w-md text-center  " > PDF uploaded succesfully
        </h1></div>
      ) : (
        <div className="w-full h-full ">
          {!project?.pdfData && file?.name && !loading ? (
            <div className="w-full h-full flex justify-center items-center ">
              <Button className="mt-10  " onClick={handleAI}>
                Submit{" "}
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
