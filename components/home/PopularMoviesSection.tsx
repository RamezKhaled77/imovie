import MovieCard, { type MovieCardData } from "@/components/home/MovieCard";

const popularMovies: MovieCardData[] = [
  {
    id: 1,
    title: "Oppenheimer",
    year: 2023,
    runtime: "180m",
    detail: "Historical",
    rating: "8.9",
    image: "/popular-card-img.jpg",
  },
  {
    id: 2,
    title: "Dune: Part Two",
    year: 2024,
    runtime: "166m",
    detail: "Sci-fi",
    rating: "8.7",
    image: "/popular-card-img.jpg",
  },
  {
    id: 3,
    title: "May December",
    year: 2023,
    runtime: "117m",
    detail: "Drama",
    rating: "7.3",
    image: "/popular-card-img.jpg",
  },
  {
    id: 4,
    title: "Fallen Leaves",
    year: 2023,
    runtime: "81m",
    detail: "Comedy",
    rating: "7.0",
    image: "/popular-card-img.jpg",
  },
  {
    id: 5,
    title: "Society of the Snow",
    year: 2023,
    runtime: "144m",
    detail: "Adventure",
    rating: "7.9",
    image: "/popular-card-img.jpg",
  },
  {
    id: 6,
    title: "All of Us Strangers",
    year: 2023,
    runtime: "105m",
    detail: "Fantasy",
    rating: "8.0",
    image: "/popular-card-img.jpg",
  },
  {
    id: 7,
    title: "Challengers",
    year: 2024,
    runtime: "131m",
    detail: "Romance",
    rating: "7.7",
    image: "/popular-card-img.jpg",
  },
  {
    id: 8,
    title: "Furiosa",
    year: 2024,
    runtime: "148m",
    detail: "Action",
    rating: "7.8",
    image: "/popular-card-img.jpg",
  },
  {
    id: 9,
    title: "La Chimera",
    year: 2023,
    runtime: "130m",
    detail: "IT / FR",
    rating: "7.5",
    image: "/popular-card-img.jpg",
  },
  {
    id: 10,
    title: "Evil Does Not Exist",
    year: 2023,
    runtime: "106m",
    detail: "Japan",
    rating: "7.4",
    image: "/popular-card-img.jpg",
  },
  {
    id: 11,
    title: "Monkey Man",
    year: 2024,
    runtime: "121m",
    detail: "Thriller",
    rating: "7.1",
    image: "/popular-card-img.jpg",
  },
  {
    id: 12,
    title: "The Boy and the Heron",
    year: 2023,
    runtime: "124m",
    detail: "Animation",
    rating: "7.6",
    image: "/popular-card-img.jpg",
  },
];

export default function PopularMoviesSection() {
  return (
    <section
      aria-labelledby="popular-movies-heading"
      className="border-b border-border-hairline bg-surface-ink py-8 sm:py-10"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-8">
        <header className="mb-6 border-b border-border-hairline pb-5">
          <h2
            id="popular-movies-heading"
            className="font-headline text-headline-md text-content-bone"
          >
            Popular Movies
          </h2>
          <p className="metadata mt-2 text-content-warm">
            Stories finding their audience right now
          </p>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
}
