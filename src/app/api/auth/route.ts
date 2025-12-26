import { envApp } from "@/core/config/env";
import { http } from "@/core/http/client";
import axios, { type AxiosError } from "axios";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const { email, password } = await request.json();

  try {
    const path = `${envApp.auth}${envApp.auth_login}`;

    const res = await http.post(path, {
      email,
      password,
    });

    const resData = Response.json(res.data, {
      status: res.data.status,
    });

    cookieStore.set({
      name: "cookie-app",
      value: res.data.token,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 1,
      path: "/",
    });

    return resData;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const e = error as AxiosError<{ status: number; message?: string }>;
      const status = e.response?.data?.status ?? e.response?.status ?? 500;

      return Response.json(e.response?.data ?? { status }, {
        status,
      });
    }

    return Response.json({ status: 500, message: "Error" }, { status: 500 });
  }
}
