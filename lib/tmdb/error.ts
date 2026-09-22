export class TmdbError extends Error {
  constructor(
    message: string,
    public status: number | null, // null = network error
  ) {
    super(message);
    this.name = "TmdbError";
  }
}
