import React from "react";
import { Link, withRouter } from "react-router-dom";
import * as movieAPI from "../../services/movie-API";
import PropTypes from "prop-types";
import styles from "./MovieList.module.css";

const MoviesList = ({ movies }) => (
  <ul className={styles.moviesContainer}>
    {movies.map(movie => (
      <li key={movie.id} className={styles.imageGalleryItems}>
        <Link to={`movies/${movie.id}`}>
          <img
            src={movieAPI.thumbnailsimglink + movie.poster_path}
            alt={movie.title}
            className={styles.imageGalleryItemsImg}
          />
          <p className={styles.movieTitle}>{movie.title}</p>
        </Link>
      </li>
    ))}
  </ul>
);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default withRouter(MoviesList);
