"use client";

import { setToken } from "@/lib/redux/token";
import supabase from "@/supabase/supabase";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GrMoney } from "react-icons/gr";
import { useDispatch } from "react-redux";

type Props = {};

export default function Token({}: Props) {
const [tokenInt, setTokenInt] = useState(0)
const dispatch = useDispatch()
const {user} = useUser()

  const params = useParams();

  const handleToken = async () => {
    try {
      const { data } = await supabase
        .from("study-projects")
        .select("token")
        .eq("userId", user?.id.toString())
        
        ;
        console.log(data)
        ;
        dispatch(setToken(data[0].token))
        setTokenInt(data[0].token)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleToken()
  }, [user])
  

  supabase
  .channel('study-projects')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'study-projects' }, handleToken)
  .subscribe()
  return (
    <div className="w-full flex justify-end mt-2 px-2 lg:mt-0  ">
      <div className="p-3 flex items-center gap-3 text-xl font-semibold border rounded-md bg-white shadow-lg ">
     {tokenInt} <GrMoney className="text-yellow-500" />
      </div>
    </div>
  );
}
