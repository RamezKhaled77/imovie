import { tmdbFetch } from "./client";
import type {
  PersonCombinedCredits,
  PersonDetails,
  PersonExternalIds,
  PersonListResponse,
} from "./types";

export function getTrendingPeople() {
  return tmdbFetch<PersonListResponse>("/trending/person/week", {
    language: "en-US",
  });
}

export function getPersonDetails(id: number) {
  return tmdbFetch<PersonDetails>(`/person/${id}`, { language: "en-US" });
}

export function getPersonExternalIds(id: number) {
  return tmdbFetch<PersonExternalIds>(`/person/${id}/external_ids`);
}

export function getPersonCombinedCredits(id: number) {
  return tmdbFetch<PersonCombinedCredits>(`/person/${id}/combined_credits`, {
    language: "en-US",
  });
}
