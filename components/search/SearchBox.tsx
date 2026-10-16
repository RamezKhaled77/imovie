"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "@/components/ui/input";
import {
  getSearchHref,
  getSearchResultHref,
  MAX_SEARCH_QUERY_LENGTH,
} from "@/lib/search-utils";
import type { SearchSuggestion } from "@/lib/tmdb/types";

type SearchSuggestionsResponse = {
  results?: SearchSuggestion[];
  error?: string;
};

type SuggestionsState = {
  query: string;
  status: "idle" | "loading" | "success" | "error";
  results: SearchSuggestion[];
};

function getSuggestionTitle(suggestion: SearchSuggestion): string {
  return suggestion.media_type === "movie" ? suggestion.title : suggestion.name;
}

function getSuggestionDetail(suggestion: SearchSuggestion): string {
  if (suggestion.media_type === "movie") {
    return `FILM${suggestion.release_date ? ` · ${suggestion.release_date.slice(0, 4)}` : ""}`;
  }

  if (suggestion.media_type === "tv") {
    return `TV${suggestion.first_air_date ? ` · ${suggestion.first_air_date.slice(0, 4)}` : ""}`;
  }

  return suggestion.known_for_department?.toUpperCase() ?? "PERFORMER";
}

export default function SearchBox({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(
    urlQuery.slice(0, MAX_SEARCH_QUERY_LENGTH),
  );
  const [suggestionsState, setSuggestionsState] = useState<SuggestionsState>({
    query: "",
    status: "idle",
    results: [],
  });
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hasEdited, setHasEdited] = useState(false);
  const requestVersion = useRef(0);

  useEffect(() => {
    const syncQueryFromHistory = () => {
      setQuery(
        (new URLSearchParams(window.location.search).get("q") ?? "").slice(
          0,
          MAX_SEARCH_QUERY_LENGTH,
        ),
      );
      setHasEdited(false);
    };

    window.addEventListener("popstate", syncQueryFromHistory);
    return () => window.removeEventListener("popstate", syncQueryFromHistory);
  }, []);

  useEffect(() => {
    const normalizedQuery = query.trim().slice(0, MAX_SEARCH_QUERY_LENGTH);

    if (!normalizedQuery || (!isFocused && !hasEdited)) return;

    const version = ++requestVersion.current;
    const controller = new AbortController();
    const timeout = window.setTimeout(async () => {
      setSuggestionsState({
        query: normalizedQuery,
        status: "loading",
        results: [],
      });

      try {
        const params = new URLSearchParams({ q: normalizedQuery });
        const response = await fetch(
          `/api/search/suggestions?${params.toString()}`,
          { signal: controller.signal },
        );
        const payload = (await response.json()) as SearchSuggestionsResponse;

        if (!response.ok)
          throw new Error(payload.error ?? "Suggestions failed");
        if (!Array.isArray(payload.results)) {
          throw new Error("Invalid suggestions response");
        }
        if (version !== requestVersion.current) return;

        setSuggestionsState({
          query: normalizedQuery,
          status: "success",
          results: payload.results,
        });
      } catch {
        if (controller.signal.aborted || version !== requestVersion.current) {
          return;
        }
        setSuggestionsState({
          query: normalizedQuery,
          status: "error",
          results: [],
        });
      }
    }, 250);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [hasEdited, isFocused, query]);

  useEffect(() => {
    if (!hasEdited) return;

    const normalizedQuery = query.trim().slice(0, MAX_SEARCH_QUERY_LENGTH);
    if (!normalizedQuery && pathname !== "/search") return;

    const timeout = window.setTimeout(() => {
      if (
        pathname !== "/search" ||
        urlQuery !== normalizedQuery ||
        searchParams.has("page")
      ) {
        router.replace(getSearchHref(normalizedQuery), { scroll: false });
      }
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [hasEdited, pathname, query, router, searchParams, urlQuery]);

  const normalizedQuery = query.trim().slice(0, MAX_SEARCH_QUERY_LENGTH);
  const hasCurrentSuggestions = suggestionsState.query === normalizedQuery;
  const visibleSuggestions = hasCurrentSuggestions
    ? suggestionsState.results
    : [];
  const suggestionsLoading =
    hasCurrentSuggestions && suggestionsState.status === "loading";
  const suggestionsError =
    hasCurrentSuggestions && suggestionsState.status === "error";
  const isOpen =
    isFocused &&
    query.trim().length > 0 &&
    (isFocused || hasEdited) &&
    (suggestionsLoading ||
      suggestionsError ||
      (hasCurrentSuggestions && suggestionsState.status === "success"));

  function navigateToSearch() {
    const normalizedQuery = query.trim().slice(0, MAX_SEARCH_QUERY_LENGTH);
    setIsFocused(false);
    setActiveIndex(-1);
    setHasEdited(false);
    router.push(getSearchHref(normalizedQuery));
    onNavigate?.();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    navigateToSearch();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" && isOpen && visibleSuggestions.length > 0) {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % visibleSuggestions.length);
    } else if (
      event.key === "ArrowUp" &&
      isOpen &&
      visibleSuggestions.length > 0
    ) {
      event.preventDefault();
      setActiveIndex((index) =>
        index <= 0 ? visibleSuggestions.length - 1 : index - 1,
      );
    } else if (event.key === "Enter" && activeIndex >= 0 && isOpen) {
      const selectedSuggestion = visibleSuggestions[activeIndex];
      if (selectedSuggestion) {
        event.preventDefault();
        setIsFocused(false);
        setHasEdited(false);
        router.push(getSearchResultHref(selectedSuggestion));
        onNavigate?.();
      }
    } else if (event.key === "Escape") {
      setIsFocused(false);
      setActiveIndex(-1);
      setHasEdited(false);
    }
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      onBlur={(event) => {
        if (
          event.relatedTarget !== null &&
          !event.currentTarget.contains(event.relatedTarget)
        ) {
          setIsFocused(false);
          setHasEdited(false);
        }
      }}
      className={`relative w-full ${className ?? ""}`}
    >
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-content-fog"
      />
      <Input
        type="search"
        value={query}
        maxLength={MAX_SEARCH_QUERY_LENGTH}
        placeholder="Search films, series, actors..."
        aria-label="Search movies, television, and performers"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={
          isOpen && visibleSuggestions.length > 0
            ? "navbar-search-listbox"
            : undefined
        }
        aria-activedescendant={
          activeIndex >= 0 ? `navbar-search-option-${activeIndex}` : undefined
        }
        role="combobox"
        autoComplete="off"
        onFocus={() => setIsFocused(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setHasEdited(true);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        className="h-10 rounded-sm border-border-hairline bg-surface-raised pl-9 pr-3 text-sm text-content-bone placeholder:text-content-fog focus-visible:border-brand-vermilion focus-visible:ring-brand-vermilion/40"
      />

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden border border-border-hairline bg-surface-reel shadow-2xl">
          <p className="metadata border-b border-border-hairline z-50 px-3 py-2 text-[9px] uppercase tracking-wider text-content-fog">
            Quick matches
          </p>
          {suggestionsLoading ? (
            <p role="status" className="px-3 py-4 text-sm text-content-fog">
              Searching the archive…
            </p>
          ) : suggestionsError ? (
            <p role="status" className="px-3 py-4 text-sm text-status-error">
              Suggestions are unavailable. Press Enter to see full results.
            </p>
          ) : visibleSuggestions.length > 0 ? (
            <div
              id="navbar-search-listbox"
              role="listbox"
              aria-label="Search suggestions"
              className="py-1"
            >
              {visibleSuggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.media_type}-${suggestion.id}`}
                  id={`navbar-search-option-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  tabIndex={-1}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => {
                    setIsFocused(false);
                    setHasEdited(false);
                    router.push(getSearchResultHref(suggestion));
                    onNavigate?.();
                  }}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left transition-colors ${
                    index === activeIndex
                      ? "bg-surface-raised"
                      : "hover:bg-surface-raised"
                  }`}
                >
                  <span className="min-w-0 truncate font-headline text-sm text-content-bone">
                    {getSuggestionTitle(suggestion)}
                  </span>
                  <span className="metadata shrink-0 text-[9px] text-content-fog">
                    {getSuggestionDetail(suggestion)}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <p role="status" className="px-3 py-4 text-sm text-content-fog">
              No quick matches. Press Enter to view all results.
            </p>
          )}
          <button
            type="submit"
            className="w-full border-t border-border-hairline px-3 py-2 text-left font-mono text-[10px] uppercase tracking-wide text-brand-vermilion hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-brand-vermilion"
          >
            View all results for “{query.trim()}”
          </button>
        </div>
      )}
    </form>
  );
}
