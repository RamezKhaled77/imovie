import type { Metadata } from "next";
import { redirect } from "next/navigation";

import LoginExperience from "@/components/auth/LoginExperience";
import { getSafeReturnPath } from "@/lib/auth/redirect";
import { getSessionId } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Connect your TMDB account | iMovie",
  description:
    "Securely connect your TMDB account to manage your cinema archive.",
};

export default async function LoginPage({
  searchParams,
}: PageProps<"/login">) {
  const [query, sessionId] = await Promise.all([
    searchParams,
    getSessionId(),
  ]);
  const rawNext = typeof query.next === "string" ? query.next : null;
  const next = getSafeReturnPath(rawNext);

  if (sessionId) redirect(next);

  const error = typeof query.error === "string" ? query.error : undefined;
  return <LoginExperience error={error} next={next} />;
}
