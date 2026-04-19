import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import { envVars } from "./env";
import {
  getDefaultDashboardRoute,
  getRoutesOwner,
  isAuthRoute,
  proUserRoutes,
} from "./lib/authUtils";
// import { getNewRefreshToken } from "./services/auth.services";
// import { isTokenExpiringSoon } from "./lib/tokenUtils";

type UserRole = "SUPER_ADMIN" | "USER";

// async function refreshTokenMiddleware(): Promise<boolean> {
//   try {
//     const refresh = await getNewRefreshToken();
//     console.log(refresh);
//     if (!refresh) {
//       return false;
//     }

//     return true;
//   } catch (error) {
//     return false;
//   }
// }

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isValidToken = accessToken
    ? jwtUtils.verifyToken(accessToken, envVars.JWT_SECRET_KEY).success
    : false;
  const decodedToken = accessToken ? jwtUtils.decodedToken(accessToken) : null;
  let user = null;
  if (decodedToken) {
    user = decodedToken;
  }
  const isAuth = isAuthRoute(pathname);
  const routeOwner = getRoutesOwner(pathname);

  // proactively refresh token if refresh token exists and access token expired or about to expire
  // const refreshedToken = request.headers.get("x-token-refreshed") === "1";
  // if (
  //   (!refreshedToken && refreshToken && !isValidToken) ||
  //   (accessToken && (await isTokenExpiringSoon(accessToken as string)))
  // ) {
  //   const requestHeaders = new Headers(request.headers);

  //   try {
  //     const refreshed = await refreshTokenMiddleware();
  //     if (refreshed) {
  //       requestHeaders.set("x-token-refreshed", "1");
  //     }

  //     return NextResponse.next({
  //       request: {
  //         headers: requestHeaders,
  //       },
  //     });
  //   } catch (error) {
  //     console.log("error in refreshing token", error);
  //   }

  //   return NextResponse.next();
  // }

  // authenticated user trying to access auth routes

  if (isAuth && isValidToken) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(user!.role as UserRole), request.url),
    );
  }

  // unauthenticated user
  if (isAuth && !isValidToken) {
    return NextResponse.next();
  }

  // protected routes
  if (!isValidToken && !refreshToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // for users with not verified email
  if (pathname.startsWith("/verify-email")) {
    if (isValidToken) {
      if (!user?.emailVerified) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(
          new URL(
            getDefaultDashboardRoute(user?.role as UserRole),
            request.url,
          ),
        );
      }
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // public routes
  if (routeOwner === null) {
    return NextResponse.next();
  }

  // free user catch

  if (user?.plan === "FREE" && proUserRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/upgrade-plan", request.url));
  }

  // admin route
  if (routeOwner === "SUPER_ADMIN" && user?.role !== "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // prevent admin to access users route
  if (routeOwner === "USER" && user?.role === "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (routeOwner === "WORKSPACE" && user?.role === "SUPER_ADMIN") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  if (routeOwner === "COMMON") {
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
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
