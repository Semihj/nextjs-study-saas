import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);



const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});





export async function handleUploadAI({ text, uri }: { text: any; uri: any }) {
  console.log(uri);

  const pdfResp = await fetch(uri).then((response) => response.arrayBuffer());

  const result = await model.generateContent([
    {
      inlineData: {
        data: Buffer.from(pdfResp).toString("base64"),
        mimeType: "application/pdf",
      },
    },
    text,
  ]);
  const answer = result.response.text();
  return answer;
}
