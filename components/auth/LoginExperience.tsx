import { ArrowUpRight, Check, LockKeyhole, X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const loginErrors: Record<string, string> = {
  denied:
    "TMDB access was not approved. You can try again whenever you’re ready.",
  expired:
    "That sign-in request expired or was already used. Start a fresh request.",
  invalid_callback: "The sign-in response was incomplete. Please start again.",
  service:
    "TMDB could not complete sign-in right now. Please try again shortly.",
  configuration: "TMDB sign-in is not configured yet. Please try again later.",
};

const steps = [
  {
    number: "01",
    title: "Generate a request token",
    label: "SERVER HANDSHAKE",
    description:
      "We ask TMDB for a short-lived token to begin a secure sign-in.",
  },
  {
    number: "02",
    title: "Approve on TMDB",
    label: "EXTERNAL APPROVAL",
    description:
      "Review and approve access directly on themoviedb.org. Your password stays there.",
  },
  {
    number: "03",
    title: "Return to your archive",
    label: "SESSION COOKIE",
    description:
      "TMDB returns an approved session. We keep only its ID in a protected browser cookie.",
  },
];

export default function LoginExperience({
  error,
  next,
}: {
  error?: string;
  next: string;
}) {
  const loginHref = `/api/auth/login?${new URLSearchParams({ next }).toString()}`;
  const errorMessage =
    error && Object.hasOwn(loginErrors, error) ? loginErrors[error] : undefined;
  const stateLabel =
    error === "denied"
      ? "State C: Access denied"
      : error === "expired" || error === "invalid_callback"
        ? "State C: Request expired"
        : errorMessage
          ? "State C: Sign-in unavailable"
          : "State A: Handshake ready";

  return (
    <main className="flex w-full flex-1 items-center px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-4xl">
        <div className="mb-6 flex flex-col gap-4 border-b border-border-hairline pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="metadata text-brand-vermilion">
              Session authentication // TMDB v3
            </p>
            <p className="metadata mt-1 text-content-fog">
              TMDB endpoint: api.themoviedb.org/3/authentication
            </p>
          </div>
          <span className="metadata inline-flex w-fit items-center gap-2 border border-border-hairline bg-surface-reel px-3 py-2 text-content-bone">
            <span className="size-1.5 rounded-full bg-brand-seaglass" />
            {stateLabel}
          </span>
        </div>

        <section className="mx-auto w-full max-w-[640px] overflow-hidden border border-border-hairline bg-surface-reel shadow-[0_18px_55px_rgba(0,0,0,0.22)]">
          <div className="flex items-center justify-between border-b border-border-hairline bg-surface-ink px-4 py-3">
            <p className="metadata text-content-fog">iMovie AUTH / READ-ONLY</p>
            <span className="metadata text-content-fog">TMDB v3</span>
          </div>

          <div className="p-5 sm:p-8">
            <p className="metadata text-brand-vermilion">
              Curatorial onboarding
            </p>
            <h1 className="mt-2 font-headline text-headline-md text-content-bone">
              Synchronize your cinema archive
            </h1>
            <p className="mt-3 max-w-2xl text-body-md text-content-fog sm:text-body-lg">
              Connect your TMDB account to curate watchlists, favorites, and
              ratings. Authentication happens on TMDB; MATINÉE never asks for or
              stores your password.
            </p>

            {errorMessage && (
              <div
                role="alert"
                className="mt-6 flex gap-3 border border-status-error/30 bg-status-error-bg/20 p-4 text-sm text-status-error"
              >
                <X aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                <p>{errorMessage}</p>
              </div>
            )}

            <ol className="mt-7 space-y-2">
              {steps.map((step, index) => (
                <li
                  key={step.number}
                  className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border border-border-hairline p-3 sm:grid-cols-[2rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4 sm:p-4"
                >
                  <span
                    className={`metadata flex size-8 items-center justify-center ${
                      index === 2
                        ? "bg-brand-seaglass/10 text-brand-seaglass"
                        : "bg-surface-raised text-brand-brass"
                    }`}
                  >
                    {index === 2 ? (
                      <Check aria-hidden="true" className="size-4" />
                    ) : (
                      step.number
                    )}
                  </span>
                  <div className="min-w-0">
                    <h2 className="font-headline text-title-editorial text-content-bone">
                      {step.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-content-fog">
                      {step.description}
                    </p>
                  </div>
                  <span className="metadata col-start-2 mt-1 w-fit bg-surface-ink px-2 py-1 text-[10px] text-content-fog sm:col-start-auto sm:mt-0">
                    {step.label}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-5 flex gap-3 border border-status-warning/20 bg-surface-ink p-4">
              <LockKeyhole
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-brand-brass"
              />
              <div>
                <p className="metadata text-brand-brass">
                  Zero-credential storage pledge
                </p>
                <p className="mt-1 text-sm leading-6 text-content-fog">
                  We never access or store your TMDB password. Your session ID
                  is protected by an httpOnly cookie and can be removed by
                  signing out.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-border-hairline pt-5 sm:flex-row">
              <Button
                size="lg"
                className="h-11 w-full justify-center gap-2 rounded-sm bg-brand-vermilion px-4 font-mono text-xs tracking-wide text-surface-ink hover:bg-brand-vermilion-hover sm:w-auto"
                render={<a href={loginHref} />}
              >
                Proceed to TMDB authorization
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-11 w-full justify-center rounded-sm border-border-hairline bg-transparent px-4 font-mono text-xs tracking-wide text-content-fog hover:border-border-strong hover:bg-surface-raised hover:text-content-bone sm:ml-auto sm:w-auto"
                render={<Link href="/" />}
              >
                Continue as guest (read-only)
              </Button>
            </div>
          </div>
        </section>

        <p className="metadata mx-auto mt-4 max-w-2xl text-center text-content-fog">
          <span className="text-brand-brass">TIP:</span> Approval opens on TMDB.
          You can return here without linking an account at any time.
        </p>
      </div>
    </main>
  );
}
