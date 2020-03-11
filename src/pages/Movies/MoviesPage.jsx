import React, { Component } from "react";
import * as movieAPI from "..//../services/movie-API";
import MoviesList from "../../Components/MoviesList/MoviesList";
import Navigation from "../../Components/Navigation/Navigation";
import SearchBar from "../../Components/SearchBar/SearchBar";
import NotFoundPage from "../../Components/NotFoudPage/NotFoundPage";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import styles from "./MoviesPage.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PropTypes from "prop-types";

const queryString = require("query-string");

export default class MoviesPages extends Component {
  static propTypes = {
    location: PropTypes.shape({
      query: PropTypes.string
    }).isRequired
  };

  state = {
    query: "",
    movies: [],
    isNotFound: null,
    error: null,
    isLoading: false
  };

  componentDidMount() {
    const { location } = this.props;
    const { query } = queryString.parse(location.search);

    if (query) {
      this.setState({ isLoading: true });
      this.getMoviesFromServer(query);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.props;
    const { query } = queryString.parse(location.search);

    if (prevProps.location.search !== location.search) {
      this.setState({ isLoading: true });
      this.getMoviesFromServer(query);
    }
  }

  getMoviesFromServer = query => {
    movieAPI
      .searchMovies(query)
      .then(res => {
        res.data.results.length === 0
          ? this.setState({ isNotFound: true })
          : this.setState({ movies: [...res.data.results] });
      })
      .catch(error => this.setState({ error }))
      .finally(this.setState({ isLoading: false }));
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;
    const { history } = this.props;

    history.push({
      ...this.props.location,
      search: `?query=${query}`
    });
  };

  render() {
    const {
      movies,
      query,
      isNotFound,
      isLoading,
      handleSubmit,
      handleInputChange
    } = this.state;

    return (
      <div className={styles.searchMoviesWrapper}>
        <Navigation />
        <SearchBar
          query={query}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
        />
        {isLoading && <Loader />}
        {movies.length > 0 && <MoviesList movies={movies} />}
        {isNotFound && <NotFoundPage />}
      </div>
    );
  }
}
