import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import TitleHeader from "../component/TitleHeader";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

export default function OrderStatus() {
  const { register, handleSubmit, errors } = useForm();
  const auth = useAuth();
  let urlParams: { id: string } = useParams();

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
      { id: 1, name: "Milestone 1", status: true },
      { id: 2, name: "Milestone 2", status: true },
      { id: 3, name: "Milestone 3", status: false },
      { id: 4, name: "Milestone 4", status: false },
    ],
  };

  const updateMilestone = (id: number) => {
    let m = data.milestones.filter((e) => {
      return e.id == id;
    });
    console.log(m);
    if (m.length > 0) {
      let m1 = m[0];
      console.log(!m[0].status);
    }
  };

  return (
    <div className="main_content">
      <TitleHeader title="Order Status" user_type="SHG" />
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

      {auth?.user?.user_type === "SME" ? (
        <div className="call_box">
          <img src="https://i.imgur.com/khUO2T7.png" alt="" />
          <div className="details">
            <h1>SHG NAME</h1>
            <p>XXXX XX XXXX</p>
          </div>
          <div className="call">
            <Icon.PhoneCall></Icon.PhoneCall>
          </div>
        </div>
      ) : (
        <div className="call_box">
          <img src="https://i.imgur.com/khUO2T7.png" alt="" />
          <div className="details">
            <h1>SME NAME</h1>
            <p>XXXX XX XXXX</p>
          </div>
          <div className="call">
            <Icon.PhoneCall></Icon.PhoneCall>
          </div>
        </div>
      )}

      <h2>Payments</h2>

      {data.payments.map((p, i) => (
        <Link to="/order/1/payment/1" className="no_style">
          <div className="payment">
            <div className="details">
              <h1 className="amount">
                ₹{p.amount}
                <span className="tag">
                  {p.status[0].toUpperCase() + p.status.slice(1)}
                </span>
              </h1>
              <h1>{p.name}</h1>
            </div>
            {auth?.user?.user_type === "SME" ? (
              <button
                className={"small" + (p.status == "pending" ? "" : " default")}
              >
                {p.status == "pending" ? "Pay" : "Details"}
              </button>
            ) : (
              <button className="small default">Details</button>
            )}
          </div>
        </Link>
      ))}

      <Link className="button" to={"/order/" + urlParams.id + "/payment"}>
        Request Payment
      </Link>
      {/* <button className="button">Request Payment</button> */}

      <hr />

      <h2>Milestones</h2>

      <div className="milestones">
        {data.milestones.map((m, index) => (
          <div className="milestone">
            <div className="index">{index + 1}.</div>
            <div className="name">{m.name}</div>
            <div className="check">
              <input
                type="checkbox"
                name={m.name}
                id={"mile_check" + m.name}
                checked={m.status}
                onClick={(e) => {
                  updateMilestone(m.id);
                }}
              />
              <span className="checkbox__control">
                <Icon.Check></Icon.Check>
              </span>
            </div>
          </div>
        ))}
      </div>

      <hr />
    </div>
  );
}
