interface envVars  {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_AUTH_URL: string;
    NEXT_PUBLIC_BETTER_AUTH_SECRET: string;
}

const envVars = () => {
    const envs = [
        "NEXT_PUBLIC_API_URL",
        "NEXT_PUBLIC_AUTH_URL",
        "NEXT_PUBLIC_BETTER_AUTH_SECRET",
    ];
    envs.forEach(env => {
        if (!process.env[env]) {
            throw new Error(`Missing environment variable: ${env}`);
        }
    });

    return {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL as string,
        NEXT_PUBLIC_AUTH_URL: process.env.NEXT_PUBLIC_AUTH_URL as string,
        NEXT_PUBLIC_BETTER_AUTH_SECRET: process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET as string,
    };
}
