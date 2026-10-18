import { describe, expect, it } from "vitest";

import { getSafeReturnPath } from "./redirect";

describe("getSafeReturnPath", () => {
  it("allows relative app routes", () => {
    expect(getSafeReturnPath("/movies?genre=18&page=2")).toBe(
      "/movies?genre=18&page=2",
    );
  });

  it("resets dangerous paths to the home route", () => {
    expect(getSafeReturnPath("https://example.com/evil")).toBe("/");
    expect(getSafeReturnPath("//evil.com")).toBe("/");
    expect(getSafeReturnPath("/movies\\nscript")).toBe("/");
  });
});
