"use server";

import { envVars } from "../../../../env";
import { authValidator } from "@/zod/authValidator";
import { redirect } from "next/navigation";
import { setTokenInCookie } from "@/lib/tokenUtils";

export const createAccount = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const parsedPayload = authValidator.register.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "invalid input";
    return {
      success: false,
      error: firstError,
    };
  }

  try {
    const res = await fetch(`${envVars.AUTH_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        error: result.message,
      };
    }

    await setTokenInCookie("accessToken", result.data.accessToken);
    await setTokenInCookie("refreshToken", result.data.refreshToken);
    await setTokenInCookie("better-auth.session_token", result.data.token,24 * 60 * 60); //1 day

    return {
      success: true,
      data: result,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const login = async (payload: { email: string; password: string }) => {
  const parsedPayload = authValidator.login.safeParse(payload);

  if (!parsedPayload.success) {
    const firstError = parsedPayload.error.issues[0].message || "invalid input";
    return {
      success: false,
      error: firstError,
    };
  }

  try {
    const res = await fetch(`${envVars.AUTH_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });


    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        error: result.message,
      };
    }


    await setTokenInCookie("accessToken", result.data.accessToken);
    await setTokenInCookie("refreshToken", result.data.refreshToken);
    await setTokenInCookie("better-auth.session_token", result.data.token,24 * 60 * 60); //1 day

    if(result.data.user.role === "SUPER_ADMIN"){
     return redirect("/admin/dashboard");
    }
    redirect("/dashboard");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    if(error && typeof error === "object" && "digest" in error && typeof error.digest === "string" && error.digest.startsWith("NEXT_REDIRECT")){
      throw error;
    }
    return {
      success: false,
      error: error.message,
    };
  }
};




