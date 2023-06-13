import React, { useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiCallStatusType, IApiCallConfig } from "../models/GeneralModels";

const useCallApi = () => {
  const [status, setStatus] = useState<ApiCallStatusType>("idle");
  const execute = (config: IApiCallConfig) => {
    setStatus("pending");

    let axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL
    });
    if (!config.noToken) {
      axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_SERVER_URL,
        headers: {
          Authorization: `Bearer xxxxxx`
        }
      });
    }
    const addr = `/api/${config.url}`;
    const body = config.getBody ? config.getBody() : null;
    let call: Promise<AxiosResponse>;
    switch (config.method) {
      case "POST":
        call = axiosInstance.post(addr, body);
        break;
      case "GET":
        call = axiosInstance.get(addr);
        break;
      case "DELETE":
        call = axiosInstance.delete(addr);
        break;
      case "PUT":
        call = axiosInstance.put(addr, body);
        break;
      case "PATCH":
        call = axiosInstance.patch(addr, body);
        break;
      default:
        call = axiosInstance.get(addr);
        break;
    }
    call
      .then((resp) => {
        if (resp.status === 200) {
          setStatus("success");
          if (config.successHandler) {
            config.successHandler(resp.data);
          }
        } else {
          setStatus("failed");
          if (config.noShowError == undefined || !config.noShowError) {
            console.error(resp.data.error.message);
            alert(resp.data.error.message);
          }
          if (config.failedHandler) {
            config.failedHandler(resp.data);
          }
        }
      })
      .catch((ex: AxiosError) => {
        setStatus("failed");
        console.log("ex", ex);
        if (config.noShowError == undefined || !config.noShowError) {
          console.error(ex.response?.data?.message);
          alert(ex.response?.data?.message);
        }
        if (config.failedHandler) {
          config.failedHandler(ex);
        }
      });
  };

  return [execute, status];
};

export default useCallApi;
