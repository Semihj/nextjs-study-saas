"use client";

import React, { useState } from 'react'

type Props = {
    examD:any,
}

export default function CheckQuestion({examD}: Props) {

  return (
    <div className="w-full flex flex-col min-h-40 gap-5 ">
    <div className="bg-black h-max border text-white rounded-md flex w-full justify-center items-center shadow-lg p-5 ">
      <h1 className="text-2xl lg:text-4xl font-semibold w-full text-center ">
        {examD.question.question}
      </h1>
    </div>
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 ">
      {examD.question.choices.map((choice:any,i:any) => (
        <div key={i} className={`w-full min-h-20 rounded-md shadow-lg p-4 text-2xl ${ !examD.correct && choice.option === examD.pickedAnswer && "bg-red-500 text-white" } ${choice.isTrue && "bg-green-500 text-white" } font-semibold hover:brightness-75 transition-all cursor-pointer `}>
          <p>{choice.option}</p>
        </div>
      ))}
    </div>
  </div>
  )
}