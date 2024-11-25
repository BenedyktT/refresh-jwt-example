"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
import { SessionContext, useSession } from "./context";
import Button from "./button";
import { refresh } from "./refreshtoken";

const useRequest = () => {
  const { setToken } = useSession();
  const instance = axios.create({});
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const token = await refresh();

        setToken(token);

        originalRequest.headers["Authorization"] = token;
        return instance(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

const Ping = () => {
  const { session } = useContext(SessionContext);
  const [response, setResponse] = useState<{
    message: string;
  }>();

  const instance = useRequest();
  const fetch = async () => {
    try {
      const response = await instance.get("api/ping", {
        headers: {
          Authorization: session?.token,
        },
      });

      setResponse(response?.data);
    } catch (error) {
      const _error = error as {
        response: { data: { message: string } };
      };

      setResponse({
        message: JSON.stringify(_error.response.data || "UNAUTHORIZED"),
      });
    }
  };

  return (
    <div>
      <Button
        onClick={async () => {
          await fetch();
        }}
      >
        PING
      </Button>
      <div className="">
        {response && response?.message ? (
          <div>{response.message}</div>
        ) : (
          <div>....</div>
        )}
      </div>
    </div>
  );
};

export default Ping;
