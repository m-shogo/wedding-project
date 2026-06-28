import { useProduction } from "../store/productionStore";

export function MovieSelector() {
  const { data, selectedMovieId, setSelectedMovieId } = useProduction();

  return (
    <select
      value={selectedMovieId}
      onChange={(e) => setSelectedMovieId(e.target.value)}
      className="text-sm border border-sand-200 rounded-lg px-3 py-1.5 bg-white text-navy-700 focus:outline-none focus:ring-2 focus:ring-gold-300"
    >
      <option value="all">すべて</option>
      {data.movies.map((movie) => (
        <option key={movie.movieId} value={movie.movieId}>
          {movie.title}
        </option>
      ))}
    </select>
  );
}
