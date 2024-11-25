"use client";
import React from "react";

type Props = {};

import axios from "axios";
import { useSession } from "./context";

const signIn = async () => {
  const response = await axios.post(
    "api/users/signin",
    {
      user: {
        email: "jondoe@gmail.com",
        password: "123456",
      },
    },
    { withCredentials: true }
  );

  // setSession({ ...response.data, token: response.headers.authorization });
  return response;
};

export default function Signin({}: Props) {
  const { setSession } = useSession();
  const handle = async () => {
    const response = await signIn();
    setSession({ ...response.data, token: response.headers.authorization });
  };
  return <button onClick={handle}>Signin</button>;
}
