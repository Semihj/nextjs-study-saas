/* import { handleUploadAI } from '@/lib/gemini/handleUploadAı';
import React from 'react'

type Props = {
    setFile:any,
    file:any
}

export default function Upload({setFile,file}: Props) {

      const handleAI = async () => {
        try {
          const data = await handleUploadAI({
            text: "give me a summary",
            file: file,
          });
          console.log(data);
          
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div className="">
    <input type="file" onChange={(e) => {
        setFile(e.target.files[0])
      }} />
      <div className="w-[140px] h-[140px] bg-gray-400 rounded-md shadow-lg " onClick={handleAI} ></div>
</div>  )
} */