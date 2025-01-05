"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, User, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import QuestionComp from "./_components/QuestionComp";
import CheckQuestion from "./_components/CheckQuestion";
import supabase from "@/supabase/supabase";
import { useParams } from "next/navigation";
import { GrMoney } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/lib/redux/token";
import TokenError from "./_components/TokenError";
import { useUser } from "@clerk/nextjs";

type Props = {};

export default function GetQuestions({}: Props) {
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [examData, setExamData] = useState([]);
  const [checkQuestions, setCheckQuestions] = useState(false);
  const [projectUrl, setProjectUrl] = useState("");
  const [showTokenError, setShowTokenError] = useState(false)
  const [history, setHistory] = useState([
    {
      id: 1,
      question: "Where was Napoleon Bonaparte born?",
      choices: [
        {
          label: "A",
          option: "Italy",
          isTrue: false,
        },
        {
          label: "B",
          option: "France",
          isTrue: false,
        },
        {
          label: "C",
          option: "Corsica",
          isTrue: true,
        },
        {
          label: "D",
          option: "Spain",
          isTrue: false,
        },
      ],
    },
    {
      id: 2,
      question: "In what year did Napoleon seize political power in France?",
      choices: [
        {
          label: "A",
          option: "1789",
          isTrue: false,
        },
        {
          label: "B",
          option: "1799",
          isTrue: true,
        },
        {
          label: "C",
          option: "1804",
          isTrue: false,
        },
        {
          label: "D",
          option: "1815",
          isTrue: false,
        },
      ],
    },
    {
      id: 3,
      question:
        "What was the name of the disastrous French invasion that led to Napoleon's first abdication?",
      choices: [
        {
          label: "A",
          option: "Invasion of Spain",
          isTrue: false,
        },
        {
          label: "B",
          option: "Invasion of Egypt",
          isTrue: false,
        },
        {
          label: "C",
          option: "Invasion of Russia",
          isTrue: true,
        },
        {
          label: "D",
          option: "Invasion of Britain",
          isTrue: false,
        },
      ],
    },
    {
      id: 4,
      question: "What significant legal code is associated with Napoleon?",
      choices: [
        {
          label: "A",
          option: "The Code of Hammurabi",
          isTrue: false,
        },
        {
          label: "B",
          option: "The Napoleonic Code",
          isTrue: true,
        },
        {
          label: "C",
          option: "Justinian Code",
          isTrue: false,
        },
        {
          label: "D",
          option: "The Code of Justinian",
          isTrue: false,
        },
      ],
    },
    {
      id: 5,
      question: "Which battle marked Napoleon's final defeat?",
      choices: [
        {
          label: "A",
          option: "Battle of Austerlitz",
          isTrue: false,
        },
        {
          label: "B",
          option: "Battle of Trafalgar",
          isTrue: false,
        },
        {
          label: "C",
          option: "Battle of Waterloo",
          isTrue: true,
        },
        {
          label: "D",
          option: "Battle of Borodino",
          isTrue: false,
        },
      ],
    },
    {
      id: 6,
      question: "To which island was Napoleon exiled after his final defeat?",
      choices: [
        {
          label: "A",
          option: "Elba",
          isTrue: false,
        },
        {
          label: "B",
          option: "Saint Helena",
          isTrue: true,
        },
        {
          label: "C",
          option: "Corsica",
          isTrue: false,
        },
        {
          label: "D",
          option: "Malta",
          isTrue: false,
        },
      ],
    },
  ]);
  const params = useParams();
  const { token } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const {user} = useUser()
  console.log(user);
  

  const getProjectUrl = async () => {
    try {
      const { data } = await supabase
        .from("study-projects")
        .select("pdfData")
        .eq("id", params.id)
        .single();
      setProjectUrl(data.pdfData.url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjectUrl();
  }, [params]);

  const handleQuiz = async () => {
    setLoading(true);
    try {
      if (token >= 100) {
        const formData = {
          url: projectUrl,
          history: {},
        };
        const res = await fetch(`/api/quiz`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        await supabase
          .from("study-projects")
          .update({ token: token - 100 })
          .eq("userId", user.id)
          

        dispatch(setToken(token - 100));
        setQuiz(data.res.quiz);
        setLoading(false);
      } else {
        setShowTokenError(true)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  const handleQuestion = async ({ data }: { data: any }) => {
    try {
      examData[quizIndex] = data;
      if (quizIndex <= quiz.length - 2) {
        return setQuizIndex(quizIndex + 1);
      } else {
        setIsFinish(true)
        setQuizIndex(0)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full">
      {showTokenError && <TokenError showTokenError={showTokenError} setShowTokenError={setShowTokenError} /> }
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center ">
          <h1 className="text-4xl animate-pulse">Loading</h1>
        </div>
      ) : (
        <div className="w-full h-full">
          {isFinish && (
            <div className="w-full flex flex-col justify-center items-center ">
              {checkQuestions && (
                <div className="w-full flex flex-wrap gap-1 mt-8 lg:gap-4 justify-center ">
                  {examData.map((data: any, i) => (
                    <div
                      className={`p-2 border rounded-full text-white font-semibold cursor-pointer hover:scale-105 transition-all ${
                        data.correct ? "bg-green-500" : "bg-red-600"
                      }`}
                      key={i}
                      onClick={() => setQuizIndex(i)}
                    >
                      {data.correct ? <Check /> : <X />}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-5 w-full flex flex-col gap-4 justify-center ">
                {!checkQuestions && (
                  <div className="w-full flex justify-center  ">
                    <Button onClick={() => setCheckQuestions(true)}>
                      Check Results
                    </Button>
                  </div>
                )}
                {checkQuestions && (
                  <div className="w-full h-full flex flex-col justify-center ">
                    <div className="w-full flex flex-col p-10">
                      <CheckQuestion examD={examData[quizIndex]} />
                    </div>
                    <div className="w-full flex justify-end gap-2 mt-5 px-10 ">
                      <ArrowLeft
                        className="cursor-pointer"
                        onClick={() => {
                          if (quizIndex != 0) {
                            setQuizIndex(quizIndex - 1);
                          }
                        }}
                      />
                      <ArrowRight
                        className="cursor-pointer"
                        onClick={() => {
                          if (quizIndex != quiz.length - 1) {
                            setQuizIndex(quizIndex + 1);
                          }
                        }}
                      />
                    </div>{" "}
                  </div>
                )}
              </div>
            </div>
          )}
          {quiz.length > 0 && !isFinish ? (
            <div className=" flex flex-col lg:p-10 p-4 ">
              <QuestionComp
                question={quiz[quizIndex]}
                handleQuestion={handleQuestion}
              />

              <div className="w-full flex justify-end gap-2 mt-5  ">
                <ArrowLeft
                  className="cursor-pointer"
                  onClick={() => {
                    if (quizIndex != 0) {
                      setQuizIndex(quizIndex - 1);
                    }
                  }}
                />
                <ArrowRight
                  className="cursor-pointer"
                  onClick={() => {
                    if (quizIndex != quiz.length - 1) {
                      setQuizIndex(quizIndex + 1);
                    }
                  }}
                />
              </div>
            </div>
          ) : (
            
            <div className="w-full h-screen flex justify-center items-center ">
              <Button
                onClick={handleQuiz}
                className=" border font-semibold text-2xl py-6 "
              >
                Prepare A Quiz 100 <GrMoney className="text-yellow-500" />{" "}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
