"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clearSessionId, getSessionId } from "@/lib/auth/session";

export async function logout(): Promise<void> {
  const sessionId = await getSessionId();
  if (!sessionId) {
    await clearSessionId();
    redirect("/");
  }

  await clearSessionId();
  revalidatePath("/", "layout");
  redirect("/");
}
