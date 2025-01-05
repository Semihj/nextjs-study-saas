
import React from 'react'

type Props = {
    question:any,
    handleQuestion:any
}

export default function QuestionComp({question,handleQuestion}: Props) {



  return (
    <div className=" flex flex-col min-h-40 gap-5 ">
    <div className="bg-black h-max border text-white rounded-md flex w-full justify-center items-center shadow-lg p-5 ">
      <h1 className="text-2xl lg:text-4xl font-semibold w-full text-center ">
        {question.question}
      </h1>
    </div>
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 ">
      {question.choices.map((choice:any,i:any) => (
        <div key={i} onClick={ async () => {
         await handleQuestion({data:{correct:choice.isTrue,pickedAnswer:choice.option,question}})
          } } className="w-full min-h-20 rounded-md shadow-lg p-4 text-2xl bg-white font-semibold hover:brightness-75 transition-all cursor-pointer ">
          <p>{choice.option}</p>
        </div>
      ))}
    </div>
  </div>
  )
}