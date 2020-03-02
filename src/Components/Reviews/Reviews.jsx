import React, { Component } from "react";
import * as movieAPI from "../../services/movie-API";
import styles from "./Reviews.module.css";
import PropTypes from "prop-types";

export default class Reviews extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        movieId: PropTypes.string
      }).isRequired
    }).isRequired
  };

  state = { data: {}, error: null };

  componentDidMount() {
    const { match } = this.props;
    const { movieId } = match.params;

    movieAPI
      .getMovieReviews(movieId)
      .then(({ data }) => this.setState({ data }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { data } = this.state;

    return (
      <div className={styles.reviewsWrapper}>
        <ul className={styles.reviewsList}>
          {(data.results &&
            data.results.length > 0 &&
            data.results.map(result => (
              <li key={result.id}>
                <h5 className={styles.reviewsAuthor}>{result.author}</h5>
                <p className={styles.reviewsText}>"{result.content}"</p>
              </li>
            ))) || (
            <div>
              <p className={styles.noReviews}>
                Sorry, there are no reviews on this movie yet. Be the first one!
              </p>
            </div>
          )}
        </ul>
      </div>
    );
  }
}
