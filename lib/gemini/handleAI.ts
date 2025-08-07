import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro",
});

export async function handleAskAI({ text, uri }: { text: any; uri: any }) {

  const pdfResp = await fetch(uri).then((response) => response.arrayBuffer());

  const result = await model.generateContent([
    {
      inlineData: {
        data: Buffer.from(pdfResp).toString("base64"),
        mimeType: "application/pdf",
      },
    },
    `I'm gonna ask you a question about the pdf document and you gonna answer the question in its language here is the question: ${text} `,
  ]);
  const answer = result.response.text();
  return answer;
}


export async function handleGetQuiz({ url,history }: { url: any,  history: any}) {
  const pdfResp = await fetch(url).then((response) => response.arrayBuffer());

  const generateQuiz = async () => {
    const result = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(pdfResp).toString("base64"),
          mimeType: "application/pdf",
        },
      },
      `Give me a quiz of 10 question with multiple choice in JSON format about this PDF and do it in the language of the Document also don't use the test questions that is in the document if there is . 
       The JSON should follow this structure: 
       { 
          "quiz": [ 
             { 
                "id": 1,
                "question": "Where did he born ?", 
                "choices": [
                   {
                      "label": "A",
                      "option": "Italy",
                      "isTrue": false,
                   },
                   ... 
                ]
             },
             ...
          ] 
       } 
       Ensure the quiz questions are unique and not present in the following history:
       ${JSON.stringify(history)}`,
    ]);

    const answer = result.response.text();
    const quizData = JSON.parse(answer.substring(7, answer.length - 3));

    return quizData;
  };

  return await generateQuiz();
}
