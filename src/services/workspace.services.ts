"use server"

import { envVars } from "@/env"
import { cookies } from "next/headers"

const getCookieHeader = async() => {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.getAll().map(cookie => `${cookie.name}=${cookie.value}`).join("; ")
    return cookieHeader;
}

export const getWorkspace = async (workspaceId : string) => {
    const cookieHeader = await getCookieHeader();

    try {
        const res = await fetch(`${envVars.API_URL}/workspace/${workspaceId}`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json",
                Cookie : cookieHeader
            }
        });

        if(!res.ok){
            return {
                success : false,
                message : res.statusText,
                data : null
            }
        }

        const result = await res.json();

        if(!result.success){
            return {
                success : false,
                message : result.message,
                data : null
            }
        }

        return {
            success : true,
            data : result.data,
            message : result.message
        }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        return {
            success : false,
            message : error.message,
            data : null
        }
    }
}