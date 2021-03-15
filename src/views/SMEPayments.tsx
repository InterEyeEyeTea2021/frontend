import { useAuth, loginForm } from "../hooks/Auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Icon from "react-feather";
import TitleHeader from "../component/TitleHeader";

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
      <TitleHeader title="Payment" user_type="SME" />

      <div>
        <h2>
          {currPayment.name}
          <span className="tag">
            {currPayment.status[0].toUpperCase() + currPayment.status.slice(1)}
          </span>
        </h2>
      </div>

      <h1>₹{currPayment.amount}</h1>

      <Link to="/order/1" className="no_style">
        <div className="detail">
          <div className="label">Order</div>
          <div className="value">Order Name</div>
        </div>
      </Link>

      <h2>SHG</h2>
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
        {currPayment.status == "pending" ? (
          <button>Pay</button>
        ) : (
          <button>Get Bill</button>
        )}
      </div>

      <hr />

      <h2>All payments</h2>
      {paymentsList.map((p) => (
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
            <button
              className={"small" + (p.status == "pending" ? "" : " default")}
            >
              {p.status == "pending" ? "Pay" : "Details"}
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SMEPayments;
