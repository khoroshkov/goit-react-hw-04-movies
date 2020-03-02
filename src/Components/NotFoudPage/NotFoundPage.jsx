import React from "react";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => (
  <div className={styles.notFoundPageContainer}>
    <h3 className={styles.notFoundPageTitle}>
      Ooops... It seems, there is nothing found...
    </h3>
    <p className={styles.notFoundPageText}>Try to change your query words</p>
  </div>
);

export default NotFoundPage;
