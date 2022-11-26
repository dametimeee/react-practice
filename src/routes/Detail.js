import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [hidden, setHidden] = useState(true);
  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  const handleTrailer = (event) => {
    console.log(event);
  };
  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movie}>
          <div className={styles.movie__img__container}>
            <img
              src={movie.medium_cover_image}
              className={styles.movie__img}
            ></img>
            <div className={styles.container}>
              <div className={styles.movie__title}>{movie.title_long}</div>
              <ul className={styles.movie__genres}>
                {movie.genres.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <div className={styles.movie__rating}>
                Member Rating: {movie.rating}
              </div>
              <div className={styles.movie__runtime}>
                Movie Runtime: {movie.runtime}m
              </div>
              <p className={styles.movie__description}>
                {movie.description_full}
              </p>
            </div>
          </div>
          <iframe
            className={`${styles.movie__video} `}
            src={`https://www.youtube.com/embed/${movie.yt_trailer_code}?autoplay=1`}
            width='600'
            height='400'
            allow='accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Detail;
