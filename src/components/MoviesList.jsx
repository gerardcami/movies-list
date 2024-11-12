import { Link } from "react-router-dom";

export const MoviesList = ({
  movies,
  genres,
  onFormSubmit,
  onGenreChange,
  base_image_url,
}) => (
  <main>
    <h2>Popular movies</h2>
    <div className="content-wrapper">
      <aside>
        <form onSubmit={onFormSubmit}>
          <div className="input-group">
            <label htmlFor="title">Search by title</label>
            <input type="text" id="title" name="movieTitle" />
          </div>

          <div className="input-group">
            <label htmlFor="genre">Select a genre</label>
            <select
              name="genreSelector"
              id="genre"
              onChange={(e) => onGenreChange(e.target.value)}
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Search</button>
        </form>
      </aside>
      <section className="movies-display">
        {movies.map((movie) => (
          <Link key={movie.id} className="movie-card" to={`/movie/${movie.id}`}>
            <img
              src={`${base_image_url}${movie.poster_path}`}
              alt={`Poster of: ${movie.name}`}
            />
            <div className="rating"></div>
            <p>{movie.title}</p>
            {/* Format the date */}
            <p>
              {new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }).format(new Date(movie.release_date))}
            </p>
          </Link>
        ))}
      </section>
    </div>
  </main>
);
