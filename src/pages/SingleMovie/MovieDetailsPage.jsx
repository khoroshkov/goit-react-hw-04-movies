import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import * as movieAPI from "../../services/movie-API";
import Cast from "..//../Components/Cast/Cast";
import Reviews from "..//../Components/Reviews/Reviews";
import Navigation from "../../Components/Navigation/Navigation";
import PropTypes from "prop-types";
import styles from "./MovieDetailsPage.module.css";

export default class MovieDetailsPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        movieId: PropTypes.string
      }).isRequired
    }).isRequired
  };

  state = {
    data: {},
    error: null
  };

  componentDidMount() {
    const { match } = this.props;
    const { movieId } = match.params;

    movieAPI
      .getMovieById(movieId)
      .then(({ data }) => this.setState({ data }))
      .catch(error => this.setState({ error }));
  }

  handleGoBack = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const {
      id,
      poster_path,
      title,
      popularity,
      overview,
      genres
    } = this.state.data;

    return (
      <div className={styles.container}>
        <Navigation />
        <div className={styles.singleMoviepageWrapper}>
          <article className={styles.movieInfo}>
            <img
              src={`https://image.tmdb.org/t/p/w500${poster_path}`}
              alt={title}
              className={styles.moviePoster}
            />
            <div className={styles.textContainer}>
              <h2 className={styles.movieTitle}>{title}</h2>
              <p className={styles.addInfoTitles}>
                Userscore:
                <span className={styles.movieScore}>{popularity}</span>
              </p>
              <p className={styles.addInfoTitles}>
                Overview:
                <span className={styles.movieDescription}>{overview}</span>
              </p>
              <div className={styles.genresContainer}>
                <p className={styles.genresTitle}>Genres:</p>
                <span>
                  {genres && genres.length > 0 && (
                    <ul className={styles.genresList}>
                      {genres.map(genre => (
                        <li key={genre.id}>
                          <span className={styles.genres}>{genre.name}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </span>
                <div className={styles.addInfoContainer}>
                  <h3 className={styles.infoTitle}>Additional information: </h3>
                  <ul className={styles.addInfoList}>
                    <li>
                      <NavLink
                        to={`/movies/${id}/cast`}
                        replace
                        className={styles.addInfoLink}
                        activeClassName={styles.active}
                      >
                        Cast
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to={`/movies/${id}/reviews`}
                        replace
                        className={styles.addInfoLink}
                        activeClassName={styles.active}
                      >
                        Reviews
                      </NavLink>
                    </li>
                  </ul>
                </div>
                <button
                  className={styles.goBackBtn}
                  type="button"
                  onClick={this.handleGoBack}
                >
                  Back to movies
                </button>
              </div>
            </div>
          </article>

          <Switch>
            <Route
              path={`${this.props.match.path}/cast`}
              exact
              component={Cast}
            />
            <Route
              path={`${this.props.match.path}/reviews`}
              exact
              component={Reviews}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
