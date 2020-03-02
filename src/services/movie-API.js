import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/";
const KEY = "8337fd7f42a8e185ca6347dd3bac477d";

export const fetchMovies = (mediaType = "movie", timeWindow = "day") => {
  return axios.get(
    `${BASE_URL}3/trending/${mediaType}/${timeWindow}?api_key=${KEY}`
  );
};

export const searchMovies = query => {
  return axios.get(
    `${BASE_URL}3/search/movie?api_key=${KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );
};

export const getMovieById = id => {
  return axios.get(`${BASE_URL}3/movie/${id}?api_key=${KEY}&language=en-US`);
};

export const getMovieCredits = id => {
  return axios.get(
    `${BASE_URL}3/movie/${id}/credits?api_key=${KEY}&language=en-US`
  );
};

export const getMovieReviews = id => {
  return axios.get(
    `${BASE_URL}3/movie/${id}/reviews?api_key=${KEY}&language=en-US&page=1`
  );
};

export const thumbnailsimglink = `https://image.tmdb.org/t/p/w342/`;
export const posterimglink = `https://image.tmdb.org/t/p/w500/`;
