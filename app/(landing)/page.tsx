"use client";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

type Props = {};

export default function Home({}: Props) {
  const { user } = useUser();
  return (
    <div className="w-full h-full">
      {/*   <SidebarProvider className=''>
      <HomeSidebar/>
      
      <SidebarTrigger>
        <Button>click</Button>
      </SidebarTrigger>
      </SidebarProvider> */}
      <div className="w-full h-full">
        <nav className="w-full h-20 border-b p-4 lg:px-20 flex justify-between items-center ">
          <h1 className=" text-4xl lg:text-6xl font-bold  cursor-pointer">
            Chat<span className="text-red-700 italic ">PDF</span>
          </h1>
          {user ? (
            <div className="">
              <UserButton />
            </div>
          ) : (
            <div className="flex gap-2 ">
              <Link href={"/sign-in"}>
                {" "}
                <Button className=" font-semibold ">Sign In</Button>
              </Link>{" "}
              <Link href={"/sign-in"} className="hidden lg:inline-block ">
                {" "}
                <Button
                  className=" font-semibold shadow-lg border "
                  variant={"outline"}
                >
                  Sign Up
                </Button>
              </Link>{" "}
            </div>
          )}
        </nav>
        <div className="w-full h-full flex flex-col justify-between lg:flex-row p-4 lg:py-20 lg:px-40   ">
          <div className="flex flex-col gap-4 w-full ">
            <h1 className="text-3xl font-semibold"> Chat with <span className="text-red-600" >PDF</span> </h1>
            <p className="text-xl">
              Transform your PDFs into interactive learning experiences. Our
              AI-powered platform allows you to effortlessly ask questions about
              your documents and receive instant, insightful answers. Need to
              test your understanding? Easily generate engaging quizzes directly
              from your PDFs, complete with multiple-choice, true/false, and
              short-answer questions.
            </p>
          </div>
          <div className="w-full border h-full"></div>
        </div>
        <div className="flex justify-center w-full p-4 lg:px-40  ">
         <Link href={"/project"} > <Button>Creata A Project</Button></Link>
        </div>
      </div>
    </div>
  );
}
