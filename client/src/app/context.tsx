"use client";
import React, { createContext, useState } from "react";

export interface Account {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  jti: string;
}

export interface SessionObject {
  message: string;
  account: Account;
  token: string;
}

type Props = {
  children: React.ReactNode;
};

export const SessionContext = createContext<{
  session: SessionObject | undefined | null;
  setSession: React.Dispatch<SessionObject | null>;
  setToken: (token: string) => void;
}>({
  session: undefined,
  setSession: () => {},
  setToken: () => {},
});

export const Context = ({ children }: Props) => {
  const [session, setSession] = useState<SessionObject | null>();

  const setToken = (token: string) => {
    setSession((prev) => {
      if (!prev)
        return {
          message: "Refreshed",
          token,
          account: {
            id: 0,
            email: "",
            created_at: "",
            updated_at: "",
            jti: "",
          },
        };
      return { ...prev, token };
    });
  };

  return (
    <SessionContext.Provider value={{ session, setSession, setToken }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = React.useContext(SessionContext);
  if (!context) throw new Error("Session not found");
  return context;
};
