
import { authClient } from "./authClient"

export const sendEmailVerificationLink = async(email : string) => {
    
   const res = await authClient.sendVerificationEmail({
        email,
        callbackURL : "/dashboard"
    })
}