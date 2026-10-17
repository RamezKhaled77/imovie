const RETURN_PATH_ORIGIN = "https://matinee.invalid";

export function getSafeReturnPath(value: string | null): string {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f\u007f]/.test(value)
  ) {
    return "/";
  }

  const url = new URL(value, RETURN_PATH_ORIGIN);
  if (url.origin !== RETURN_PATH_ORIGIN) return "/";

  return `${url.pathname}${url.search}`;
}
