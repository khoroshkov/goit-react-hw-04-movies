import React, { Component } from "react";
import * as movieAPI from "../../services/movie-API";
import styles from "./Cast.module.css";
import PropTypes from "prop-types";

export default class Cast extends Component {
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
      .getMovieCredits(movieId)
      .then(({ data }) => this.setState({ data }))
      .catch(error => this.setState({ error }));
  }

  render() {
    const { data } = this.state;
    return (
      <div className={styles.castContainer}>
        <ul className={styles.castList}>
          {data.cast &&
            data.cast.length > 0 &&
            data.cast.map(actor => (
              <li key={actor.cast_id} className={styles.castItems}>
                {actor.profile_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                    alt={actor.name}
                    className={styles.castImg}
                  />
                )}
                <h5 className={styles.castActorName}>{actor.name}</h5>
                {actor.character.length > 0 && (
                  <p className={styles.castCharacterTitle}>
                    Character:{" "}
                    <span className={styles.castCharacterName}>
                      {actor.character}
                    </span>
                  </p>
                )}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
