import React from "react";
import { Link, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import * as movieAPI from "../../services/movie-API";
import PropTypes from "prop-types";
import styles from "./MovieList.module.css";
import popTransition from "../../transitions/pop.module.css"
import posterUnavailible from "..//../img/poster-unavailible.jpg"

const MoviesList = ({ movies, location}) => (
  <TransitionGroup component="ul" className={styles.moviesContainer}>
  
    {movies.map(movie => (
      <CSSTransition key={movie.id} timeout={200} unmountOnExit classNames={popTransition}>
      <li key={movie.id} className={styles.imageGalleryItems}>
        <Link to={{pathname: `movies/${movie.id}`,
      state: {from: location}}}>
          {movie.poster_path !== null ? (<img
            src={movieAPI.thumbnailsimglink + movie.poster_path}
            alt={movie.title}
            className={styles.imageGalleryItemsImg}
          />) : (<img src={posterUnavailible} alt={movie.title}
            className={styles.imageGalleryItemsImg}/>)}
          <p className={styles.movieTitle}>{movie.title}</p>
        </Link>
      </li>
      </CSSTransition>
    ))}
  
  </TransitionGroup>
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
