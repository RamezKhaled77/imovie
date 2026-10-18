import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { resolveTmdbRequestInit } from "./client";

describe("resolveTmdbRequestInit", () => {
  it("caches public reads by default", () => {
    expect(resolveTmdbRequestInit("/movie/popular")).toMatchObject({
      cache: "force-cache",
      next: { revalidate: 3600 },
    });
  });

  it("keeps genre lists cached longer", () => {
    expect(resolveTmdbRequestInit("/genre/movie/list")).toMatchObject({
      cache: "force-cache",
      next: { revalidate: 86400 },
    });
  });

  it("avoids caching account and auth requests", () => {
    expect(resolveTmdbRequestInit("/account").cache).toBe("no-store");
    expect(resolveTmdbRequestInit("/authentication/token/new").cache).toBe("no-store");
    expect(resolveTmdbRequestInit("/search/multi").cache).toBe("no-store");
  });
});
