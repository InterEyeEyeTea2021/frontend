import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import TitleHeader from "../component/TitleHeader";

export default function BidForm() {
  const { register, handleSubmit, errors } = useForm();
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
    payments: [
      { pay_name: "Order Completion", suggested_value: 2000 },
      { pay_name: "Order Completion", suggested_value: null },
    ],
    milestones: [
      { name: "Milestone 1" },
      { name: "Milestone 2" },
      { name: "Milestone 3" },
      { name: "Milestone 4" },
    ],
  };

  return (
    <div className="main_content">
      <TitleHeader title="Create Bid" user_type="SHG" />
      <div className="form" style={{ width: "90%" }}>
        <div className="sme-details call_box">
          <img src="https://i.imgur.com/khUO2T7.png" alt="" />
          <div className="details">
            <h1>SHG NAME</h1>
            <p>XXXX XX XXXX</p>
          </div>
          <div className="call">
            <Icon.PhoneCall></Icon.PhoneCall>
          </div>
        </div>

        <h2>Tender Details</h2>
        <div className="detail">
          <div className="label">Tender Name</div>
          <div className="value">{data.tender_name}</div>
        </div>
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

        <hr />

        <h2>Milestones</h2>

        <div className="milestones">
          {data.milestones.map((m, index) => (
            <div className="milestone">
              <div className="index">{index + 1}.</div>
              <div className="name">{m.name}</div>
              {/* <div className="check">check</div> */}
            </div>
          ))}
        </div>

        <hr />

        <h2>Payments</h2>

        {data.payments.map((p, i) => (
          <div className="payment_details">
            <div className="detail">
              <div className="label">{p.pay_name} (Suggested by SME)</div>
              <div className="value">
                {p.suggested_value ? p.suggested_value : "Nil"}
              </div>
            </div>

            <label htmlFor={"payment" + p.pay_name}>{p.pay_name}</label>
            <input
              name={"payment" + p.pay_name}
              id={"payment" + p.pay_name}
              placeholder="Price"
              ref={register({
                required: false,
              })}
            />
            <br />
          </div>
        ))}

        <button className="button">Bid for Order</button>
      </div>
    </div>
  );
}
