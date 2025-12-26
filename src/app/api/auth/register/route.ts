import { envApp } from "@/core/config/env";

export const runtime = "edge";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const path = `${envApp.baseURL}${envApp.path}${envApp.auth}${envApp.auth_register}`;

    const res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    const resData = Response.json(data, {
      status: data.status,
    });

    return resData;
  } catch (error) {
    return Response.json(
      {
        status: 500,
        version: 1,
        message: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      },
      { status: 500 }
    );
  }
}
