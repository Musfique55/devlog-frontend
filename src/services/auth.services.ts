"use server"

import { envVars } from "@/env";
import { setTokenInCookie } from "@/lib/tokenUtils";

export const getNewRefreshToken = async (refreshToken : string) : Promise<boolean> => {
  try{
    const res = await fetch(`${envVars.AUTH_URL}/refresh-token`,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        Cookie : `refreshToken=${refreshToken}`
      }
    });

    if(!res.ok){
      console.log(res);
      return false;
    }

    const result = await res.json();

    if(!result.success){
      return false;
    }


    const {accessToken,refreshToken : newRefreshToken,sessionToken} = result;

    if(accessToken){
      await setTokenInCookie("accessToken",accessToken);
    }

    if(refreshToken){
      await setTokenInCookie("refreshToken",newRefreshToken);
    }

    if(sessionToken){
      await setTokenInCookie("better-auth.session_token",sessionToken,24 * 60 * 60); //1 day
    }

    return true;
    
  }catch(error){
    console.log(error);
    return false;
  }
}

export const getUserInfo = async () => {
    try {
        const res = await fetch(`${envVars.AUTH_URL}/me`,{
          method : "GET",
          headers : {
            "Content-Type" : "application/json",
            // Cookie : `refreshToken=${refreshToken}`
          }
        });

        if(!res.ok){
            return {
                success : false,
                message : res.statusText
            }
        }

        const result = await res.json();

        if(!result.success){
            return {
                success : false,
                message : result.message
            }
        }

        return {
            success : true,
            data : result.data
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
        return {
            success : false,
            message : error.message
        }
    
    }
}