import React, { Component } from "react";
import { Route, Switch, NavLink } from "react-router-dom";
import * as movieAPI from "../../services/movie-API";
import Cast from "..//../Components/Cast/Cast";
import Reviews from "..//../Components/Reviews/Reviews";
import Navigation from "../../Components/Navigation/Navigation";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PropTypes from "prop-types";
import styles from "./MovieDetailsPage.module.css";
import posterUnavailibleLarge from "..//../img/poster-unavailible-large.jpg";

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
    error: null,
    isLoading: false
  };

  componentDidMount() {
    const { match } = this.props;
    const { movieId } = match.params;

    this.setState({ isLoading: true });

    movieAPI
      .getMovieById(movieId)
      .then(({ data }) => this.setState({ data }))
      .catch(error => this.setState({ error }))
      .finally(this.setState({ isLoading: false }));
  }

  handleGoBack = () => {
    const { history, location } = this.props;

    if (location.state) {
      return history.push(location.state.from);
    } else if (location.state === undefined) {
      return history.push("/");
    } else history.goBack();
  };

  // не работает
  handleCloseOnClick = () => {
    const { history, location, match } = this.props;
    const { movieId } = match.params;

    if (location.pathname === `/movies/${movieId}/cast`) {
      console.log(location.pathname, movieId);
      console.log(`/movies/${movieId}`);
     

      return history.push(`/movies/${movieId}`);
      // return history.goBack(); // работает - на главную.
    }
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
            {poster_path !== null ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={title}
                className={styles.moviePoster}
              />
            ) : (
              <img
                src={posterUnavailibleLarge}
                alt={title}
                className={styles.moviePoster}
              />
            )}
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
                  {genres && (
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
                        onClick={this.handleCloseOnClick}
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

          {this.state.isLoading && (
            <Loader
              type="Triangle"
              color="#00BFFF"
              height={150}
              width={150}
              timeout={3000}
            />
          )}

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
