"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { clearExpiredSession } from "@/actions/account";

export default function AccountExpiredSession({
  returnTo,
}: {
  returnTo: string;
}) {
  const router = useRouter();

  useEffect(() => {
    let active = true;

    void clearExpiredSession().then(() => {
      if (active) {
        const query = new URLSearchParams({
          error: "expired",
          next: returnTo,
        });
        router.replace(`/login?${query.toString()}`);
      }
    });

    return () => {
      active = false;
    };
  }, [returnTo, router]);

  return (
    <main className="flex flex-1 items-center bg-surface-ink px-4 py-12 text-content-bone sm:px-8">
      <p role="status" className="mx-auto max-w-prose text-center text-sm text-content-fog">
        Your TMDB session expired. Clearing the session and returning you to
        sign in…
      </p>
    </main>
  );
}
