import { useAuth, loginForm } from "../hooks/Auth";
import React, { useState } from "react";

import * as Icon from "react-feather";

function SMEPayments() {
  const [isLoading, setIsLoading] = useState(false);
  let auth = useAuth();
  const currSHG = {
    name: "SHG NAME",
    contact: "XXXX XX XXXX",
  };
  const currPayment = {
    amount: 2000,
    name: "Machinery",
    status: "pending",
  };
  const paymentsList = [
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
  ];

  return (
    <div className="main_content">
      <h1>Payment</h1>
      <div>
        <h1>{currPayment.name}</h1>
        <p>
          {currPayment.status[0].toUpperCase() + currPayment.status.slice(1)}
        </p>
      </div>

      <h1>₹{currPayment.amount}</h1>

      <div className="detail">
        <div className="label">Order</div>
        <div className="value">Order Name</div>
      </div>

      <h1>SHG</h1>
      <div className="shg-details call_box">
        <img src="https://i.imgur.com/khUO2T7.png" alt="" />
        <div className="details">
          <h1>SHG NAME</h1>
          <p>XXXX XX XXXX</p>
        </div>
        <div className="call">
          <Icon.PhoneCall></Icon.PhoneCall>
        </div>
      </div>

      <div>
        <button>Get Bill</button>
      </div>

      <h1>All payments</h1>
      {paymentsList.map((p) => (
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
    </div>
  );
}

export default SMEPayments;
