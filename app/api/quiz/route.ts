import { handleGetQuiz } from "@/lib/gemini/handleAI";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  try {
    const data = await req.json();
    const res = await handleGetQuiz({
      url: data.url,
      history:data.history
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
