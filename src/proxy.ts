import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("snapterra_token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/signup";

  // 1. If user is NOT logged in and trying to access protected routes -> Redirect to Login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 2. If user IS logged in and trying to access Login/Signup -> Redirect to Dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/tasks", request.url));
  }

  // 3. Security Gate: Fetch is_pro status for dashboard and upgrade routes
  const isDashboardRoute =
    pathname.startsWith("/tasks") ||
    pathname.startsWith("/links") ||
    pathname.startsWith("/screenshots");
  
  const isUpgradePage = pathname === "/upgrade";

  if (token && (isDashboardRoute || isUpgradePage)) {
    try {
      // Fetch user profile to check is_pro status
      const response = await fetch(new URL("/api/auth/me", request.url), {
        headers: {
          Cookie: `snapterra_token=${token}`,
        },
      });

      if (response.ok) {
        const user = await response.json();

        // If not pro and trying to access dashboard, redirect to /upgrade
        if (!user.is_pro && isDashboardRoute) {
          console.log(
            `[Proxy] User ${user.id} is not Pro. Redirecting to /upgrade`,
          );
          return NextResponse.json(null, {
            status: 307,
            headers: {
              Location: new URL("/upgrade", request.url).toString(),
            },
          });
        }
        
        // If IS pro and trying to access /upgrade, redirect to dashboard
        if (user.is_pro && isUpgradePage) {
          console.log(
            `[Proxy] User ${user.id} is Pro. Redirecting from /upgrade to /tasks`,
          );
          return NextResponse.redirect(new URL("/tasks", request.url));
        }
      }
    } catch (error) {
      console.error("[Proxy] Error checking pro status:", error);
    }
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  // Protect all dashboard routes, auth pages, and the upgrade page
  matcher: [
    "/tasks/:path*",
    "/links/:path*",
    "/screenshots/:path*",
    "/login",
    "/signup",
    "/upgrade",
  ],
};
