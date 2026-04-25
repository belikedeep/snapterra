import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get("snapterra_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // Public routes that anyone can see
  const isPublicRoute = pathname === "/";

  // 1. If user is logged in and trying to access Login/Signup -> Redirect to Settings
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/screenshots", request.url));
  }

  // 2. Protected routes logic
  const isAppRoute =
    pathname === "/settings" ||
    pathname.startsWith("/tasks") ||
    pathname.startsWith("/links") ||
    pathname.startsWith("/screenshots");

  const isUpgradePage = pathname === "/upgrade";

  // If user is NOT logged in and trying to access protected routes -> Redirect to Login
  if (!token && !isPublicRoute && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && (isAppRoute || isUpgradePage)) {
    try {
      // Fetch user profile to check is_pro status
      const response = await fetch(new URL("/api/auth/me", request.url), {
        headers: {
          Cookie: `snapterra_token=${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();

        // If not pro and trying to access protected routes, redirect to /upgrade
        if (!user.is_pro && isAppRoute) {
          console.log(
            `[Proxy] User ${user.id} is not Pro. Redirecting to /upgrade`,
          );
          return NextResponse.redirect(new URL("/upgrade", request.url));
        }

        // If IS pro and trying to access /upgrade, redirect to /settings
        if (user.is_pro && isUpgradePage) {
          console.log(
            `[Proxy] User ${user.id} is Pro. Redirecting from /upgrade to /settings`,
          );
          return NextResponse.redirect(new URL("/settings", request.url));
        }
      }
    } catch (error) {
      console.error("[Proxy] Error checking pro status:", error);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Protect all app routes, auth pages, and the upgrade page
  matcher: [
    "/",
    "/settings",
    "/tasks/:path*",
    "/links/:path*",
    "/screenshots/:path*",
    "/login",
    "/signup",
    "/upgrade",
  ],
};
