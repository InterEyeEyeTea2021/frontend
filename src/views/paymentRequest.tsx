import { paymentForm } from "../hooks/RequestPayment";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/Auth";
import * as Icon from "react-feather";
import TitleHeader from "../component/TitleHeader";
import { useParams } from "react-router";
import { url } from "inspector";

function RequestPayment() {
  const [isLoading, setIsLoading] = useState(false);
  let auth = useAuth();

  let urlParams: { pay_id: string; id: string } = useParams();

  const { handleSubmit, register } = useForm();
  const currSME = {
    name: "SME NAME",
    contact: "XXXX XX XXXX",
  };

  const currOrder = "Order Name";

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
  const onSubmit = (data: paymentForm) => {
    console.log(data);
  };

  return (
    <div className="main_content">
      <TitleHeader title="Payment" user_type="SHG" />
      <div className="detail">
        <div className="label">Payment</div>
        <div className="value">{urlParams.pay_id}</div>
      </div>
      <div className="detail">
        <div className="label">Order: {urlParams.id}</div>
        <div className="value">{currOrder}</div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="reason">Reason</label>
        <input
          name="reason"
          id="reason"
          placeholder="Reason"
          // defaultValue={data.prod_name}
          ref={register({
            required: true,
          })}
        />

        <label htmlFor="description">Description</label>
        <input
          name="description"
          id="description"
          placeholder="Description"
          // defaultValue={data.prod_name}
          ref={register({
            required: true,
          })}
        />

        <h2>SME</h2>
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

        <div>
          <button type="submit" className="button">
            Request Payment
          </button>
        </div>
      </form>

      <h2>All payments</h2>
      {paymentsList.map((p, i) => (
        <div className="payment">
          <h1 className="amount">₹{p.amount}</h1>
          <div className="details">
            <h1>{p.name}</h1>
            <p>{p.status[0].toUpperCase() + p.status.slice(1)}</p>
          </div>
          <button className="small default">Details</button>
        </div>
      ))}
    </div>
  );
}

export default RequestPayment;
