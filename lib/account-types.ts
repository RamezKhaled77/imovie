export type AccountMediaType = "movie" | "tv";

export type TmdbAccountStates = {
  favorite: boolean;
  watchlist: boolean;
  rated: false | { value: number };
};

export type AccountStateUpdate =
  | { field: "favorite" | "watchlist"; value: boolean }
  | { field: "rated"; value: number };

export type AccountActionResult =
  | {
      status: "success";
      message: string;
      update: AccountStateUpdate;
    }
  | {
      status: "error" | "expired";
      message: string;
    };
