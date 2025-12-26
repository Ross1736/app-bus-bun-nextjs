import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { envApp } from "./core/config/env";
import { http } from "./core/http/client";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const cookieApp = cookieStore.get("cookie-app");

  const { pathname } = new URL(request.nextUrl);

  if (!cookieApp) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  }

  try {
    const token = cookieApp.value;

    const path = `${envApp.auth}${envApp.auth_verify}`;

    const res = await http.get(path, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (
      res.data.status === 200 &&
      (pathname === "/login" || pathname === "/register")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.log(error);

    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
