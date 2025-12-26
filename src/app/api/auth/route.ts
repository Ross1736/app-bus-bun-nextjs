import { envApp } from "@/core/config/env";
import { cookies } from "next/headers";

export const runtime = "edge";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const { email, password } = await request.json();

  try {
    const path = `${envApp.baseURL}${envApp.path}${envApp.auth}${envApp.auth_login}`;

    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    const resData = Response.json(data, {
      status: data.status,
    });

    cookieStore.set({
      name: "cookie-app",
      value: data.token,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1,
      path: "/",
    });

    return resData;
  } catch (error) {
    return Response.json(
      {
        status: 500,
        message: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      },
      { status: 500 }
    );
  }
}
