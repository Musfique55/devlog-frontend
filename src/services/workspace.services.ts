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

export const getWorkspace = async (workspaceId: string) => {
  const cookieHeader = await getCookieHeader();

  try {
    const res = await fetch(`${envVars.API_URL}/workspace/${workspaceId}`, {
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
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const getWorkspacesByUser = async () => {
  const cookieHeader = await getCookieHeader();

  try {
    const res = await fetch(`${envVars.API_URL}/workspace/me`, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
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
      message: result.message,
      success: true,
      data: result.data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const getWorkspaceMembers = async (
  workspaceId: string,
  query?: Record<string, string>,
) => {
  const cookieHeader = await getCookieHeader();

  try {
    const url = new URL(`${envVars.API_URL}/workspace/${workspaceId}/members`);
    if (query) {
      url.search = new URLSearchParams(query).toString();
    }
    const res = await fetch(url, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
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
      message: result.message,
      data: result.data,
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

export const getUsersOverallWorkspaceStats = async () => {
  const cookieHeader = await getCookieHeader();

  try {
    const res = await fetch(`${envVars.API_URL}/workspace/me/stats`, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
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
      message: result.message,
      data: result.data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong",
      data: null,
    };
  }
};

export const getWorkspaceStats = async (id: string) => {
  const cookieHeader = await getCookieHeader();

  try {
    const res = await fetch(`${envVars.API_URL}/workspace/${id}/stats`, {
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
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
      message: result.message,
      data: result.data,
    }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error : any) {
    return {
      success: false,
      message: error.message,
      data: null,
    }
  }
};

export const createWorkspace = async (payload: {
  name: string;
  adminId: string;
}) => {
  const cookieHeaders = await getCookieHeader();
  try {
    const res = await fetch(`${envVars.API_URL}/workspace/create-workspace`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeaders,
      },
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
        message: res.statusText,
        data: null,
      };
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};

export const inviteUserToWorkspace = async (payload: {
  email: string;
  workspaceId: string;
}) => {
  const cookieHeaders = await getCookieHeader();
  try {
    const res = await fetch(
      `${envVars.API_URL}/workspace/${payload.workspaceId}/invite`,
      {
        method: "POST",
        body: JSON.stringify({ email: payload.email }),
        headers: {
          Cookie: cookieHeaders,
          "Content-Type": "application/json",
        },
      },
    );

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const verifyTeamLink = async (link: string) => {
  try {
    const token = link.split("?token=")[1];
    const res = await fetch(`${envVars.API_URL}/invite/accept/${token}`);
    console.log(res);
    if (!res.ok) {
      return {
        success: false,
        message: res.statusText,
      };
    }

    const result = await res.json();
    console.log(result);
    return {
      success: true,
      message: result.message,
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
