"use server";

import { LogPromise } from "@/components/modules/(user)/dashboard/my-logs/my-logs-wrapper";
import { StandupData } from "@/components/modules/(user)/dashboard/standup-form";
import { envVars } from "@/env";
import { httpClient } from "@/lib/axios/httpClient";
import { cookies } from "next/headers";

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  return cookieHeader;
};

export const createLog = async (payload: StandupData) => {
  const cookieHeader = await getCookieHeader();

  const data = Object.fromEntries(
    Object.entries(payload).filter(([_, value]) => value !== ""),
  ) as Partial<StandupData>;

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

export const getMyLogs = async (
  query: Record<string, string>,
): Promise<LogPromise> => {
  const cookieHeader = await getCookieHeader();
  try {
    const url = new URL(`${envVars.API_URL}/logs`);
    url.search = new URLSearchParams(query).toString();

    console.log(url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    if (!res.ok) {
      return {
        success: false,
        message: res.statusText,
        data: null,
        meta: null,
      };
    }

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message,
        data: null,
        meta: null,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
      meta: result.meta,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
      data: null,
      meta: null,
    };
  }
};

export const deleteLog = async (id: string) => {
  console.log(id);
  const cookieHeader = await getCookieHeader();
  try {
    const res = await fetch(`${envVars.API_URL}/logs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    if (!res.ok) {
      return {
        success: false,
        message: res.statusText,
      };
    }

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message,
      };
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const updateLog = async (id: string, payload: Partial<StandupData>) => {
  const cookieHeader = await getCookieHeader();

  try {
    const res = await fetch(`${envVars.API_URL}/logs/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
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
      message: result.message,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    console.log(error);
    return {
      success: false,
      message: error.message || "Something went wrong",
      data: null,
    };
  }
};
