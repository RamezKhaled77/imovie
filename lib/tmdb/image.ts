function getImageUrl(
  path: string | null,
  //TODO - add more width options
  size: "w200" | "w500" | "original",
): string | null {
  if (!path) return null;

  return `${process.env.TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

export { getImageUrl };
