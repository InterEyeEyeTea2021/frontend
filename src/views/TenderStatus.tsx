import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TitleHeader from "../component/TitleHeader";

export default function TenderStatus() {
  const milestones = [
    { name: "Milestone 1" },
    { name: "Milestone 2" },
    { name: "Milestone 3" },
    { name: "Milestone 4" },
  ];

  const data = {
    tender_name: "Tender Name",
    industry_type: "Agriculture",
    description: "Description",
    skills_req: "Skills Required",
    location: "Location",
    bids: [
      {
        image: "https://i.imgur.com/khUO2T7.png",
        shg_name: "SHG Name",
        bid: 2000,
      },
      {
        image: "https://i.imgur.com/khUO2T7.png",
        shg_name: "SHG Name",
        bid: 1000,
      },
    ],
    milestones: [
      { name: "Milestone 1" },
      { name: "Milestone 2" },
      { name: "Milestone 3" },
      { name: "Milestone 4" },
    ],
  };

  return (
    <div className="main_content tender_status">
      <TitleHeader title="Tender Status" user_type="SME" />

      <h2>{data.tender_name}</h2>

      <div className="detail">
        <div className="label">Industry Type</div>
        <div className="value">{data.industry_type}</div>
      </div>

      <div className="detail">
        <div className="label">Description</div>
        <div className="value">{data.description}</div>
      </div>

      <div className="detail">
        <div className="label">Skills Required</div>
        <div className="value">{data.skills_req}</div>
      </div>

      <div className="detail">
        <div className="label">Location</div>
        <div className="value">{data.location}</div>
      </div>

      <button className="button">Invite SHGs</button>

      <hr />

      <h2>Bids</h2>

      {data.bids.map((b, i) => (
        <div className="bid">
          <div className="image">
            <img src={b.image} alt="" />
          </div>
          <div className="details">
            <h1>{b.shg_name}</h1>
            <p>Bid: {b.bid}</p>
          </div>
        </div>
      ))}

      <hr />

      <h2>Milestones</h2>
      <div className="milestones">
        {data.milestones.map((m, index) => (
          <div className="milestone">
            <div className="index">{index + 1}.</div>
            <div className="name">{m.name}</div>
            <div className="check">check</div>
          </div>
        ))}
      </div>
    </div>
  );
}
