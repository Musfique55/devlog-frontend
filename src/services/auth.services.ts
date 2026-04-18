"use server";

import { envVars } from "@/env";
import { deleteCookie } from "@/lib/cookieUtils";
import { setTokenInCookie } from "@/lib/tokenUtils";
import { cookies } from "next/headers";

const getCookieHeader = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
  return cookieHeader;
};

export const getNewRefreshToken = async (): Promise<boolean> => {
  const cookieHeader = await getCookieHeader();
  if (!cookieHeader.length) {
    return false;
  }

  try {
    const res = await fetch(`${envVars.AUTH_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    if (!res.ok) {
      return false;
    }

    const result = await res.json();

    if (!result.success) {
      return false;
    }

    const { accessToken, refreshToken: newRefreshToken, sessionToken } = result;

    if (accessToken) {
      await setTokenInCookie("accessToken", accessToken);
    }

    if (newRefreshToken) {
      await setTokenInCookie("refreshToken", newRefreshToken);
    }

    if (sessionToken) {
      await setTokenInCookie(
        "better-auth.session_token",
        sessionToken,
        24 * 60 * 60,
      ); //1 day
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserInfo = async () => {
  const cookieHeader = await getCookieHeader();
  if (!cookieHeader.length) {
    return {
      success: false,
      message: "Access token not found",
      data: null,
    };
  }
  try {
    const res = await fetch(`${envVars.AUTH_URL}/me`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      }),
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
      message : result.message
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const logout = async () => {
  const cookieHeader = await getCookieHeader();
  if (!cookieHeader.length) {
    return {
      success: false,
      message: "Access token not found",
    };
  }
  try {
    await fetch(`${envVars.AUTH_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("better-auth.session_token");
    deleteCookie("__Secure-better-auth.session_token");
    deleteCookie("__Secure-better-auth.session_data");
    return {
      success: true,
      message: "Logged out successfully",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
