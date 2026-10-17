import { NextResponse } from "next/server";

import { REQUEST_TOKEN_COOKIE_NAME, requestTokenCookieOptions } from "@/lib/auth/session";
import { getSafeReturnPath } from "@/lib/auth/redirect";
import { createRequestToken } from "@/lib/tmdb/auth";
import { TmdbError } from "@/lib/tmdb/error";

const TMDB_AUTHORIZE_URL = "https://www.themoviedb.org/authenticate/";

class AuthConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthConfigurationError";
  }
}

function getAppOrigin(requestUrl: string): string {
  const appUrl = process.env.APP_URL;
  if (appUrl) {
    let configuredUrl: URL;
    try {
      configuredUrl = new URL(appUrl);
    } catch {
      throw new AuthConfigurationError("APP_URL must be a valid URL");
    }

    if (
      (configuredUrl.protocol !== "https:" &&
        configuredUrl.protocol !== "http:") ||
      (process.env.NODE_ENV === "production" &&
        configuredUrl.protocol !== "https:")
    ) {
      throw new AuthConfigurationError(
        "APP_URL must use HTTPS in production",
      );
    }
    return configuredUrl.origin;
  }

  const request = new URL(requestUrl);
  if (
    process.env.NODE_ENV !== "production" &&
    ["localhost", "127.0.0.1", "::1"].includes(request.hostname)
  ) {
    return request.origin;
  }

  throw new AuthConfigurationError(
    "APP_URL must be configured before enabling TMDB login",
  );
}

function getLoginErrorUrl(requestUrl: string, error: string, next: string) {
  const loginUrl = new URL("/login", requestUrl);
  loginUrl.searchParams.set("error", error);
  if (next !== "/") loginUrl.searchParams.set("next", next);
  return loginUrl;
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const next = getSafeReturnPath(requestUrl.searchParams.get("next"));

  try {
    const appOrigin = getAppOrigin(request.url);
    const callbackUrl = new URL("/api/auth/callback", appOrigin);
    if (next !== "/") callbackUrl.searchParams.set("next", next);

    const requestToken = await createRequestToken();
    const authorizeUrl = new URL(
      encodeURIComponent(requestToken),
      TMDB_AUTHORIZE_URL,
    );
    authorizeUrl.searchParams.set("redirect_to", callbackUrl.toString());

    const response = NextResponse.redirect(authorizeUrl, 303);
    response.cookies.set(
      REQUEST_TOKEN_COOKIE_NAME,
      requestToken,
      requestTokenCookieOptions(),
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    if (
      !(error instanceof TmdbError) &&
      !(error instanceof AuthConfigurationError)
    ) {
      throw error;
    }

    console.error("TMDB login could not start", {
      status: error instanceof TmdbError ? error.status : null,
      name: error.name,
    });
    const response = NextResponse.redirect(
      getLoginErrorUrl(
        request.url,
        error instanceof TmdbError ? "service" : "configuration",
        next,
      ),
      303,
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  }
}
