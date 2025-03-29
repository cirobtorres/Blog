import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./service/user-me-loader";
import { protectedRoutes } from "./config/routes";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const currentPath = url.pathname;
  // const currentPath = request.nextUrl.pathname;

  // 1. Redirect URL JWT Tokens (if exists)
  const token = url.searchParams.get("jwt");

  if (token) {
    const response = NextResponse.redirect(new URL(currentPath, request.url));
    response.cookies.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    return response;
  }

  // 2. Authentication
  try {
    // Protecting routes
    const user = await getUserMeLoader();
    const currentPath = request.nextUrl.pathname;
    if (protectedRoutes.includes(currentPath) && !user.ok) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next(); // Authenticated
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.next(); // Not authenticated
  }
}
