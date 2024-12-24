import { handleUploadAI, handleUploadPdf } from "@/lib/gemini/handleUploadAı";
import supabase from "@/supabase/supabase";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;

const fileManager = new GoogleAIFileManager(apiKey);

async function uploadToGemini(path, mimeType) {
  const uploadResult = await fileManager.uploadFile(path, {
    mimeType,
    displayName: path,
  });
  const file = uploadResult.file;
  console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  console.log(file);

  return file;
}

async function waitForFilesActive(files) {
  console.log("Waiting for file processing...");
  for (const name of files.map((file) => file.name)) {
    let file = await fileManager.getFile(name);
    while (file.state === "PROCESSING") {
      process.stdout.write(".");
      await new Promise((resolve) => setTimeout(resolve, 10_000));
      file = await fileManager.getFile(name);
    }
    if (file.state !== "ACTIVE") {
      throw Error(`File ${file.name} failed to process`);
    }
  }
  console.log("...all files ready\n");
}

export const POST = async (req: any) => {
  try {
    const data = await req.json();
    const res = await handleUploadPdf({
      url: data.url,
      path: data.path,
    });
    return NextResponse.json({
       ...res,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error,
    });
  }
};
