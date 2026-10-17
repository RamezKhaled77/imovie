import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getSafeReturnPath } from "@/lib/auth/redirect";
import {
  REQUEST_TOKEN_COOKIE_NAME,
  SESSION_COOKIE_NAME,
  requestTokenCookieOptions,
  sessionCookieOptions,
} from "@/lib/auth/session";
import { TmdbError } from "@/lib/tmdb/error";
import { createSession } from "@/lib/tmdb/auth";

function getLoginUrl(requestUrl: string, error: string, next: string) {
  const loginUrl = new URL("/login", requestUrl);
  loginUrl.searchParams.set("error", error);
  if (next !== "/") loginUrl.searchParams.set("next", next);
  return loginUrl;
}

function redirectToLogin(requestUrl: string, error: string, next: string) {
  const response = NextResponse.redirect(
    getLoginUrl(requestUrl, error, next),
    303,
  );
  response.cookies.set(REQUEST_TOKEN_COOKIE_NAME, "", {
    ...requestTokenCookieOptions(),
    maxAge: 0,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function GET(request: Request) {
  const callbackUrl = new URL(request.url);
  const next = getSafeReturnPath(callbackUrl.searchParams.get("next"));
  const approved = callbackUrl.searchParams.get("approved");
  const requestToken = callbackUrl.searchParams.get("request_token");
  const denied = callbackUrl.searchParams.get("denied") === "true";
  const cookieStore = await cookies();
  const issuedToken = cookieStore.get(REQUEST_TOKEN_COOKIE_NAME)?.value;

  if (denied || approved === "false") {
    return redirectToLogin(request.url, "denied", next);
  }

  if (!requestToken || approved !== "true") {
    return redirectToLogin(request.url, "invalid_callback", next);
  }

  if (!issuedToken || issuedToken !== requestToken) {
    return redirectToLogin(request.url, "expired", next);
  }

  try {
    const sessionId = await createSession(requestToken);
    const response = NextResponse.redirect(new URL(next, request.url), 303);
    response.cookies.set(SESSION_COOKIE_NAME, sessionId, sessionCookieOptions());
    response.cookies.set(REQUEST_TOKEN_COOKIE_NAME, "", {
      ...requestTokenCookieOptions(),
      maxAge: 0,
    });
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    if (!(error instanceof TmdbError)) throw error;

    console.error("TMDB session exchange failed", { status: error.status });
    return redirectToLogin(
      request.url,
      error.status === 401 || error.status === 422 ? "expired" : "service",
      next,
    );
  }
}
