import React from "react";
import styles from "./SearchBar.module.css";
import PropTypes from "prop-types";

const SearchBar = ({ query, handleInputChange, handleSubmit }) => (
  <div className={styles.searchBarContainer}>
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <button type="submit" className={styles.SearchFormButton}>
        <span className={styles.SearchFormButtonLabel}>Search</span>
      </button>

      <input
        className={styles.SearchFormInput}
        type="text"
        defaultValue={query}
        name="query"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        onChange={handleInputChange}
      />
    </form>
  </div>
);

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default SearchBar;
