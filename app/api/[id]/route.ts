import { handleUploadAI } from "@/lib/gemini/handleUploadAı";
import { NextResponse } from "next/server";


export const POST = async (req: any) => {
  try {
    const data = await req.json();
    const res = await handleUploadAI({
      uri: data.uri,
      text: data.text,
    });
    return NextResponse.json({
       res,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
    });
  }
};
