import { MovieSelector } from "./MovieSelector";

interface HeaderProps {
  title: string;
  description?: string;
  showMovieSelector?: boolean;
}

export function Header({ title, description, showMovieSelector }: HeaderProps) {
  return (
    <header className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-navy-900 font-serif">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-navy-500">{description}</p>
        )}
      </div>
      {showMovieSelector && <MovieSelector />}
    </header>
  );
}
