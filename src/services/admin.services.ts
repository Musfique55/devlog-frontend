"use server"

import { envVars } from "@/env";
import fetchWithAuthServer from "@/lib/fetchWithAuth"

export const getStats = async () => {
    try {
        const res = await fetchWithAuthServer(`${envVars.API_URL}/dashboard/super-admin`);
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
            message : result.message,
            data : result.data
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


export const getProfitStats = async () => {
    try {
        const res = await fetchWithAuthServer(`${envVars.API_URL}/dashboard/yearly-profit`);
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
            message : result.message,
            data : result.data
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

export const getUserGrowthStats = async () => {
    try {
        const res = await fetchWithAuthServer(`${envVars.API_URL}/dashboard/user-growth`);
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
            message : result.message,
            data : result.data
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