import React from "react";
import routes from "../routes";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => (
  <div className={styles.navigationWrapper}>
    <ul className={styles.navContainer}>
      <li className={styles.menuList}>
        <NavLink
          to={routes.HOME}
          exact
          className={styles.navigationLink}
          activeStyle={{ color: "#1313fd" }}
        >
          Home
        </NavLink>
      </li>
      <li className={styles.menuList}>
        <NavLink
          to={routes.MOVIES}
          className={styles.navigationLink}
          activeStyle={{ color: "#1313fd" }}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </div>
);

export default Navigation;
