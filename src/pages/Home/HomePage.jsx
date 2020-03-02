import React, { Component } from "react";
import Navigation from "../../Components/Navigation/Navigation";
import MoviesList from "../../Components/MoviesList/MoviesList";
import * as movieAPI from "../../services/movie-API";
import styles from "./HomePage.module.css"

export default class HomePage extends Component {
  state = { movies: [], error: null };

  componentDidMount() {
    movieAPI
      .fetchMovies()
      .then(res => this.setState({ movies: [...res.data.results] }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { movies } = this.state;
    return (
      <div className={styles.homePageWrapper}>
        <Navigation />
        <h1 className={styles.mainTitle}>All about cinema</h1>
        <h2 className={styles.slogan}> Get news... explore cast... read reviews... </h2>
        <MoviesList movies={movies} />
      </div>
    );
  }
}
