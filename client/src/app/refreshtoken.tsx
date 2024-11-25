"use client";
import axios from "axios";
import React from "react";
import { useSession } from "./context";
import Button from "./button";

export const refresh = async (): Promise<string> => {
  const response = await axios.post("/api/users/refresh_token");
  console.log({ response });
  if (!response.headers.authorization) {
    throw new Error("No token found");
  }

  return response.headers.authorization;
};

export default function RefreshToken() {
  const { setToken } = useSession();
  const handle = async () => {
    const token = await refresh();
    setToken(token);
  };
  return <Button onClick={handle}>RefreshToken</Button>;
}
