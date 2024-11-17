"use client";
import React from "react";
import { useSession } from "./context";

export default function DataRender() {
  const { session } = useSession();

  return (
    <div className="box w-[500px] text-wrap break-words">
      {JSON.stringify(session, null, 2)}
    </div>
  );
}
