import React, {lazy, Suspense} from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import routes from "../routes";
import Loader from "../Loader/Loader";
import styles from "./App.module.css";

const AsyncHomePage = lazy(() => import("../../pages/Home/HomePage" /* webpackChunkName: "home-page" */))

const AsyncMovieDetailsPage = lazy(() => import("../../pages/SingleMovie/MovieDetailsPage" /* webpackChunkName: "movie-details-page" */))

const AsyncMoviesPage = lazy(() => import("../../pages/Movies/MoviesPage" /* webpackChunkName: "movies-page" */))

const App = () => (
  <BrowserRouter>
    <div className={styles.mainWraper}>
      <Suspense fallback={Loader}>
      <Switch>
        <Route path={routes.HOME} exact component={AsyncHomePage} />
        <Route path={routes.MOVIE_DETAILS} component={AsyncMovieDetailsPage} />
        <Route path={routes.MOVIES} exact component={AsyncMoviesPage} />
        <Redirect to={routes.HOME} />
      </Switch>
      </Suspense>
    </div>
  </BrowserRouter>
);

export default App;
