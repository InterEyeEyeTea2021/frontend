import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
export default function OrderStatus() {
  const { register, handleSubmit, errors } = useForm();

  const data = {
    order_name: "Order Name",
    industry_type: "Agriculture",
    description: "Description",
    skills_req: "Skills Required",
    location: "Location",
    payments: [
      {
        amount: 2000,
        name: "Machinery",
        status: "pending",
      },
      {
        amount: 5000,
        name: "Machinery",
        status: "paid",
      },
      {
        amount: 2000,
        name: "Machinery",
        status: "paid",
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
    <div className="main_content">
      <h1>Order Status</h1>
      <div className="form" style={{ width: "90%" }}>
        <h2>Order Details</h2>
        <div className="detail">
          <div className="label">Tender Name</div>
          <div className="value">{data.order_name}</div>
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
        <h2>Payments</h2>

        {data.payments.map((p, i) => (
          <div className="payment">
            <h1 className="amount">₹{p.amount}</h1>
            <div className="details">
              <h1>{p.name}</h1>
              <p>{p.status[0].toUpperCase() + p.status.slice(1)}</p>
            </div>
            <button
              className={"small" + (p.status == "pending" ? "" : " default")}
            >
              {p.status == "pending" ? "Pay" : "Details"}
            </button>
          </div>
        ))}

        <button className="button">Request Payment</button>

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

        <hr />
      </div>
    </div>
  );
}
