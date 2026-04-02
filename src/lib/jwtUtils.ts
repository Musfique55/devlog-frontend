"use server"

import jwt from "jsonwebtoken";
import { envVars } from "../../env";

const verifyToken = (token: string) => {
  try {
    const verifiedToken = jwt.verify(token, envVars.JWT_SECRET_KEY as string);

    const user = jwt.decode(verifiedToken as string);

    return {
      data: user,
      error: null,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      data: null,
      error: error.message,
    };
  }
};

export const jwtUtils = {
  verifyToken,
};
