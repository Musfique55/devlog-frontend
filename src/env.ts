
import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const envVars = createEnv({
  server: {
    API_URL: z.url(),
    AUTH_URL: z.url(),
    BACKEND_URL: z.url(),
    FRONTEND_URL: z.url(),
    BETTER_AUTH_SECRET: z.string(),
    JWT_SECRET_KEY :  z.string(),
  },
  runtimeEnv: {
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
  },
});
