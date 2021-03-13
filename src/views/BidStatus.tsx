import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function BidStatus() {
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
      { pay_name: "Order Completion", value: 2000, suggested_value: 1500 },
      { pay_name: "Order Completion", value: null, suggested_value: null },
    ],
    milestones: [
      { name: "Milestone 1" },
      { name: "Milestone 2" },
      { name: "Milestone 3" },
      { name: "Milestone 4" },
    ],
  };

  return (
    <div className="authform">
      <h1>Create Bid</h1>
      <div className="form" style={{ width: "90%" }}>
        <div className="sme-details">
          <h1>Box</h1>
          <div>
            <h1>SHG NAME</h1>
            <h2>XXXX XX XXXX</h2>
          </div>
          <h1>Call icon</h1>
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

        <ol
          style={{
            maxWidth: 200,
          }}
        >
          {data.milestones.map((m, index) => (
            <li>{m.name}</li>
          ))}
        </ol>

        <hr />

        <h2>Payments</h2>

        {data.payments.map((p, i) => (
          <div className="payment">
            <div className="detail">
              <div className="label">{p.pay_name} (Suggested by SME)</div>
              <div className="value">
                {p.suggested_value ? p.suggested_value : "Nil"}
              </div>
            </div>
            <div className="detail">
              <div className="label">Your Bid</div>
              <div className="value">{p.value ? p.value : "Nil"}</div>
            </div>
          </div>
        ))}

        <button className="button"> Cancel Bid</button>
      </div>
    </div>
  );
}
