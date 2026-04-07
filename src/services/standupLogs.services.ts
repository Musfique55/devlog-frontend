"use server";

import { envVars } from "@/env";
import { cookies } from "next/headers";

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  return cookieHeader;
};

export const createLog = async (payload: Record<string, unknown>) => {
  const cookieHeader = await getCookieHeader();

  let data;

  Object.entries(payload).forEach(([key, value]) => {
    if (value === "") {
      delete payload[key];
    }
    data = payload;
  });

  try {
    const res = await fetch(`${envVars.API_URL}/logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      return {
        success: false,
        message: res.statusText,
        data: null,
      };
    }

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        data: null,
      };
    }

    return {
      success: true,
      data: result.data,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: null,
    };
  }
};
