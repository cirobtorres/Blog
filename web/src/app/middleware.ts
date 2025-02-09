import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "../service/user-me-loader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  // Routes to protect
  // if (currentPath.startsWith("/") && user.ok === false) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}
