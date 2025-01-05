"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import supabase from "@/supabase/supabase";
import { useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { GrMoney } from "react-icons/gr";

type Props = {
    showTokenError:any;
    setShowTokenError:any
};

export default function TokenError({showTokenError,setShowTokenError}: Props) {
  

  return (
    <Dialog open={showTokenError} onOpenChange={setShowTokenError} >
      <DialogContent className="  lg:w-full p-5 rounded-md ">
        <DialogHeader className="w-full justify-start flex items-start">
          <DialogTitle className="flex gap-3" >Not Enough Token <GrMoney className="text-yellow-400" /> </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
           <p className="text-lg font-semibold" >You don't have enough token for this feature </p> 
           <p>Come back tommorow for 200 more token <GrMoney className="text-yellow-400" />  </p> 
        </div>
      </DialogContent>
    </Dialog>
  );
}
