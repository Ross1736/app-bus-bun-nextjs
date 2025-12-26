export const envApp = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL ?? "",
  path: process.env.NEXT_PUBLIC_PATH ?? "",
  auth: process.env.NEXT_PUBLIC_AUTH ?? "",
  auth_login: process.env.NEXT_PUBLIC_AUTH_LOGIN ?? "",
  auth_verify: process.env.NEXT_PUBLIC_AUTH_VERIFY ?? "",
};
