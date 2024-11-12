import { useState, useEffect } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useParams, Link } from "react-router-dom";

export const MovieDetails = ({ base_url, base_image_url }) => {
  /* Get the movie id from the url using useParams hook */
  const { id } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `${base_url}movie/${id}?api_key=9a602b7d84929ff0257c5089227242ba`
        );
        const result = await response.json();
        setDetails(result);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id, base_url]);

  if (!details) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <header>
        <figure>
          <img
            src={`${base_image_url}${details.poster_path}`}
            alt={`Poster of: ${details.original_title}`}
          />
        </figure>

        <div className="header-details-container">
          <div className="details-title">
            <h1>{details.original_title}</h1>
            <p>{`(${details.release_date?.toString().substr(0, 4)})`}</p>
          </div>

          <section className="rating">
            <div className="circular-progress-container">
              <CircularProgressbar
                value={details.vote_average * 10}
                text={`${(Number(details.vote_average) * 10)
                  .toString()
                  .substr(0, 2)}%`}
              />
            </div>
            <p>
              Users
              <br />
              rating
            </p>
          </section>

          <section className="overview">
            <p className="tagline">{details.tagline}</p>
            <h3>Overview</h3>
            <p>{details.overview}</p>
          </section>
        </div>
      </header>
      <section className="details-section">
        <dl>
          <div>
            <dt className="detail-title">Status</dt>
            <dd>{details.status}</dd>
          </div>
          <div>
            <dt className="detail-title">Original Language</dt>
            <dd>
              {new Intl.DisplayNames(["en"], { type: "language" }).of("en")}
            </dd>
          </div>
          <div>
            <dt className="detail-title">Budget</dt>
            <dd>{details.budget}</dd>
          </div>
          <div>
            <dt className="detail-title">Revenue</dt>
            <dd>{details.revenue}</dd>
          </div>
        </dl>
      </section>
      <Link to={"/"}>
        <p>Go back</p>
      </Link>
    </main>
  );
};
