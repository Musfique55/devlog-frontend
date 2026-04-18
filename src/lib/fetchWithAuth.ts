"use server"

import { cookies } from "next/headers";

const getCookieHeader = async () => {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join("; ")
    return cookieHeader;
}

const fetchWithAuthServer = async (url: string,options : RequestInit = {}) => {
    const cookieHeader = await getCookieHeader();
    let res = await fetch(url,{
        ...options,
        headers : {
            ...options.headers,
            Cookie : cookieHeader
        }
    })

    if(res.status === 401){
        const refreshRes = await fetch(`${process.env.AUTH_URL}/refresh-token`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                Cookie : cookieHeader
            }
        })

        if(!refreshRes.ok){
            throw new Error("Unauthorized")  
        }

        res = await fetch(url,{
            ...options,
            headers : {
                ...options.headers,
                Cookie : cookieHeader
            }
        });
    }

    return res;
};

export default fetchWithAuthServer;