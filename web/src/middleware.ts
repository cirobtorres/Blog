import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "./service/user-me-loader";
import { protectedRoutes } from "./config/routes";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const currentPath = url.pathname;
  const searchParams = url.searchParams;

  // 1. Handle JWT from query params (after provider auth)
  const token = searchParams.get("jwt");
  if (token) {
    // Remove jwt from URL
    searchParams.delete("jwt");
    const response = NextResponse.redirect(
      new URL(
        `${currentPath}${
          searchParams.toString() ? `?${searchParams.toString()}` : ""
        }`,
        request.url
      )
    );

    response.cookies.set("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return response;
  }

  // 2. Authentication check
  try {
    const user = await getUserMeLoader();

    // Protecting routes
    if (protectedRoutes.includes(currentPath) && !user.ok) {
      // Store the current path for redirect after login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", currentPath);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error verifying user:", error);
    return NextResponse.next();
  }
}
