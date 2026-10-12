function getImageUrl(
  path: string | null,
  size: "w200" | "w300" | "w500" | "w780" | "w1280" | "original",
): string | null {
  if (!path) return null;

  return `${process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export { getImageUrl };
