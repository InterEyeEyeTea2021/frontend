import React from "react";
import illus from "../images/illus.svg";

function Home() {
  return (
    <div className="home main_content">
      <div className="content">
        <img src={illus} alt="" />
        <h1>Grameen Setu</h1>
        <p>
          GrameenSetu is an e-Marketplace to link rural producers and bulk
          buyers for unleashing the true potential which is lying in more than 6
          Lakh villages of India. Our portal also connects different rural
          producers in similar segments so that they could collaborate among
          themselves, form micro-supply chains and benefit each other.
        </p>
      </div>
    </div>
  );
}

export default Home;
