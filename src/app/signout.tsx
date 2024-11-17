"use client";
import React, { useContext } from "react";
import Button from "./button";
import axios from "axios";
import { SessionContext } from "./context";
import { revalidatePath } from "next/cache";

type Props = {};

export default function SignOut({}: Props) {
  const { session, setSession } = useContext(SessionContext);
  console.log({ session });
  return (
    <Button
      onClick={async () => {
        await axios.delete("/accounts/signout", {
          headers: {
            Authorization: session?.token,
          },
          withCredentials: true,
        });

        setSession(null);
        revalidatePath("/");
      }}
    >
      SignOut
    </Button>
  );
}
