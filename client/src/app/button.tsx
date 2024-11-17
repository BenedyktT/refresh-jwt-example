"use client";

import React, { HTMLAttributes } from "react";

export type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: HTMLAttributes<HTMLButtonElement>["className"];
};

export default function Button({ children, onClick, className }: Props) {
  const cn =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg";
  return (
    <button className={cn + className} onClick={onClick}>
      {children}
    </button>
  );
}
