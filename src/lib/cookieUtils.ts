import { cookies } from "next/headers"

const setCookie  = async (key: string, value: string,maxAgeInSeconds ?: number ) => {
    const cookieStore = await cookies();

    cookieStore.set(key, value,{
        maxAge : maxAgeInSeconds,
        sameSite : "none",
        secure : true,
        httpOnly : true,
        path : "/"
    });
}

const getCookie = async (key: string) => {
    const cookieStore = await cookies();

    return cookieStore.get(key);
}

const deleteCookie = async (key: string) => {
    const cookieStore = await cookies();

    cookieStore.delete(key);
}


export const cookieUtils = {
    setCookie,
    getCookie,
    deleteCookie
}