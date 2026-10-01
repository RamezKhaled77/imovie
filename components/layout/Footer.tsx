import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Trending", href: "/#trending-heading" },
  { label: "Popular Movies", href: "/#popular-movies-heading" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-hairline bg-surface-ink">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-10 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center font-headline text-3xl font-medium leading-none tracking-[-0.07em] text-content-bone"
          >
            <span className="text-brand-vermilion">i</span>Movie
          </Link>
          <p className="mt-4 w-full max-w-[20rem] text-sm leading-6 text-content-fog">
            A little more room for the films that stay with you.
          </p>
        </div>

        <nav aria-label="Footer quick links">
          <h2 className="metadata text-content-bone">Quick links</h2>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-content-fog transition-colors hover:text-brand-vermilion focus-visible:text-brand-vermilion"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="metadata text-content-bone">Contact</h2>
          <a
            href="mailto:hello@imovie.app"
            className="mt-4 inline-flex items-center gap-2 text-sm text-content-fog transition-colors hover:text-brand-vermilion focus-visible:text-brand-vermilion"
          >
            <Mail aria-hidden="true" className="size-4" />
            hello@imovie.app
          </a>
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex w-fit items-center gap-1 text-sm text-content-fog transition-colors hover:text-brand-vermilion focus-visible:text-brand-vermilion"
          >
            Movie data by TMDB
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>

      <div className="border-t border-border-hairline">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-4 py-4 text-xs text-content-fog sm:px-8 md:flex-row md:items-center md:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} iMovie</span>
          <span>Film information provided by TMDB.</span>
        </div>
      </div>
    </footer>
  );
}
