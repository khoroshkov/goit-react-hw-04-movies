import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


const Loader = () => (
  <div >
    <Loader
      type="Triangle"
      color="#00BFFF"
      height={150}
      width={150}
      timeout={3000}
      
    />
  </div>
);

export default Loader;