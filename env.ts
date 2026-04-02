import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

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
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL,
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    BETTER_AUTH_SECRET: process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET,
    JWT_SECRET_KEY : process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
  },
});
