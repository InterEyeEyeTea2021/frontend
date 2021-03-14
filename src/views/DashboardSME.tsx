import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../constants/constants";
import { useAuth } from "../hooks/Auth";
import axios from "axios";

export default function DashboardSME() {
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();

  const data = {
    ongoingOrder: [
      {
        image: "https://i.imgur.com/khUO2T7.png",
        orderName: "Order Name",
        nameSHG: "Ram Setu SHG",
        completion: "75%",
      },
      {
        image: "https://i.imgur.com/khUO2T7.png",
        orderName: "Order Name",
        nameSHG: "Not Ram Setu SHG",
        completion: "50%",
      },
    ],

    tenders: [
      {
        image: "https://i.imgur.com/khUO2T7.png",
        orderName: "Order Name",
        date: "1st April 2021",
        bids: "2",
      },
      {
        image: "https://i.imgur.com/khUO2T7.png",
        orderName: "Order Name",
        date: "1st April 2021",
        bids: "2",
      },
    ],

    completedOrders: [
      {
        image: "https://i.imgur.com/khUO2T7.png",
        orderName: "Order Name",
        nameSHG: "Ram Setu SHG",
        completion: "75%",
      },
      {
        image: "https://i.imgur.com/khUO2T7.png",
        orderName: "Order Name",
        nameSHG: "Not Ram Setu SHG",
        completion: "50%",
      },
    ],

    payments: [
      {
        amount: "2000",
        projectName: "Project Impossible",
        nameSHG: "Ram Setu again",
      },
      {
        amount: "2000",
        projectName: "Project Impossible",
        nameSHG: "Ram Setu again",
      },
    ],
  };

  return (
    <div className="main_content dashboard dashboard_shg">
      <h1> Dashboard </h1>
      <h2> Ongoing Order </h2>
      {data.ongoingOrder.map((order, id) => (
        <div className="order">
          <div className="image">
            <img src={order.image} alt="" />
          </div>
          <div className="details">
            <h1>{order.nameSHG}</h1>
            <p> COMPLETION: {order.completion} </p>
          </div>
        </div>
      ))}

      <h2> Tenders </h2>
      {data.tenders.map((tender, id) => (
        <div className="tender">
          <div className="image">
            <img src={tender.image} alt="" />
          </div>
          <div className="details">
            <h1>{tender.orderName}</h1>
            <p> {tender.date} </p>
            <p> {tender.bids} BIDS RECEIVED </p>
          </div>
        </div>
      ))}

      <input type="submit" value="Create Tender" />

      <h2> Completed Orders </h2>
      {data.completedOrders.map((order, id) => (
        <div className="order">
          <div className="image">
            <img src={order.image} alt="" />
          </div>
          <div className="details">
            <h1>{order.nameSHG}</h1>
            <p> COMPLETION: {order.completion} </p>
          </div>
        </div>
      ))}

      <h2> Payments </h2>
      {data.payments.map((payment, id) => (
        <div className="payment lite">
          <h1 className="amount">{payment.amount}</h1>
          <div className="details">
            <h1> {payment.projectName} </h1>
            <p> {payment.nameSHG} </p>
          </div>
        </div>
      ))}
    </div>
  );
}
