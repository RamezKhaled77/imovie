export function parseTmdbId(value: string) {
  const id = Number(value);

  return Number.isSafeInteger(id) && id > 0 && id <= 2_147_483_647 ? id : null;
}

export function parseSeasonNumber(value: string) {
  const seasonNumber = Number(value);

  return Number.isSafeInteger(seasonNumber) &&
    seasonNumber >= 0 &&
    seasonNumber <= 999
    ? seasonNumber
    : null;
}

export function parseEpisodeNumber(value: string) {
  const episodeNumber = Number(value);

  return Number.isSafeInteger(episodeNumber) &&
    episodeNumber > 0 &&
    episodeNumber <= 9999
    ? episodeNumber
    : null;
}
