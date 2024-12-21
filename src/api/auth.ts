import { AxiosResponse } from "axios";
import axios from "./axiosClient";
import { ApiError, ApiResponse } from "@src/utils/Types";
import { BaseUrl } from "@src/utils/Base_url";

export const login = async (body: any) => {
  try {
    console.log({ body });
    const response = await fetch(`${BaseUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log({ response });
  } catch (error) {
    console.log({ error });
  }
};
