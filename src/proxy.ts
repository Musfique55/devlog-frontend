import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import { envVars } from "./env";
import {
  getDefaultDashboardRoute,
  getRoutesOwner,
  isAuthRoute,
  proUserRoutes,
} from "./lib/authUtils";
import { getNewRefreshToken } from "./services/auth.services";
import { isTokenExpiringSoon } from "./lib/tokenUtils";

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const refresh = await getNewRefreshToken(refreshToken);
    if (!refresh) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const routesOwner = getRoutesOwner(pathname);
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const accessToken = request.cookies.get("accessToken")?.value;
  const isAuth = isAuthRoute(pathname);


  // public route
  if (routesOwner === null && !isAuth ) {
    return NextResponse.next();
  }

  // case -1 authenticated user trying to access auth routes -> not allowed

  if(isAuth){
    if(accessToken){
      const user = jwtUtils.decodedToken(accessToken);
      return NextResponse.redirect(new URL(getDefaultDashboardRoute(user.role), request.url));
    }
    return NextResponse.next();
  }

  // protected routes
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  const verifiedToken = jwtUtils.verifyToken(
    accessToken,
    envVars.JWT_SECRET_KEY,
  );

  if (!verifiedToken.success) {
    console.log("not succeed vftoken")
    request.cookies.delete("accessToken");
    request.cookies.delete("refreshToken");
    request.cookies.delete("better-auth.session_token");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = jwtUtils.decodedToken(accessToken);


  //   proactively refresh token if refresh_token is expired or about to expire
  if (
    verifiedToken.success &&
    refreshToken &&
    (await isTokenExpiringSoon(refreshToken))
  ) {
    const requestHeaders = new Headers(request.headers);

    console.log(requestHeaders);

    const response = NextResponse.next({
        request : {
            headers : requestHeaders
        }
    })

    try {

        const refreshed = await refreshTokenMiddleware(refreshToken);

        if(refreshed){
          console.log("refreshing");
            requestHeaders.set("x-token-refreshed","1");
        }
        return NextResponse.next({
            request : {
                headers : requestHeaders
            },
            headers : response.headers
        })
        
    } catch (error) {
        console.log("Error refreshing token:", error);
    }

    console.log(response);
    return response;
  }


  // case - 2 if authenticated user needs password reset
  // if (pathname === "/reset-password") {
  //   if (user.email) {
  //     return NextResponse.redirect(
  //       new URL(`/forgot-password?email=${user.email}`, request.url),
  //     );
  //   }
  // }

  // case - 3 free plan user trying to access pro content
  if (proUserRoutes.includes(pathname) && user.plan === "FREE") {
    return NextResponse.redirect(new URL("/upgrade-plan", request.url));
  }


  // case - 4 super-admin route access attempt
  if (routesOwner === "SUPER_ADMIN" && user.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //   case - 5 solo-user-route
  if (routesOwner === "USER" && user.role === "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  //   case - 6 workspace route
  if (routesOwner === "WORKSPACE" && user.role === "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  //   case - 7 common routes
  if (routesOwner === "COMMON") {
    return NextResponse.next();
  }
  

  return NextResponse.next();
}


export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (unless you want to proxy API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};