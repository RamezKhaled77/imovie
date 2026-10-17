import "server-only";

import { cookies } from "next/headers";

export const SESSION_COOKIE_NAME =
  process.env.SESSION_COOKIE_NAME || "matinee_session";
export const REQUEST_TOKEN_COOKIE_NAME = "matinee_auth_request";

const secureCookie = process.env.NODE_ENV === "production";

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: secureCookie,
    sameSite: "lax" as const,
    path: "/",
  };
}

export async function getSessionId(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return sessionId?.trim() || null;
}

export async function clearSessionId(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export function requestTokenCookieOptions() {
  return {
    httpOnly: true,
    secure: secureCookie,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 5 * 60,
  };
}
