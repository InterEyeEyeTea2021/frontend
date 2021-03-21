import React from "react";
import illus from "../images/illus.svg";

function Home() {
  return (
    <div className="home main_content">
      <div className="content">
        <img src={illus} alt="" />
        <h1>Grameen-Setu</h1>
        <p>Transforming Rural Livelihoods</p>
      </div>
    </div>
  );
}

export default Home;
