import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../constants/constants";
import { useAuth } from "../hooks/Auth";
import axios from "axios";
import TitleHeader from "../component/TitleHeader";
import { Link } from "react-router-dom";

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
      <TitleHeader title="Dashboard" user_type="SME" />
      <h2>Ongoing Orders</h2>
      {data.ongoingOrder.map((order, id) => (
        <Link to="/order/1" className="no_style">
          <div className="order">
            <div className="image">
              <img src={order.image} alt="" />
            </div>
            <div className="details">
              <h1>{order.nameSHG}</h1>
              <p> COMPLETION: {order.completion} </p>
            </div>
          </div>
        </Link>
      ))}

      <h2>Tenders</h2>
      {data.tenders.map((tender, id) => (
        <Link to="/tender/1" className="no_style">
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
        </Link>
      ))}

      <Link className="button" to="/tender">
        Create Tender
      </Link>

      <h2>Completed Orders</h2>
      {data.completedOrders.map((order, id) => (
        <Link to="/order/1" className="no_style">
          <div className="order">
            <div className="image">
              <img src={order.image} alt="" />
            </div>
            <div className="details">
              <h1>{order.nameSHG}</h1>
              <p> COMPLETION: {order.completion} </p>
            </div>
          </div>
        </Link>
      ))}

      <h2> Payments </h2>
      {data.payments.map((payment, id) => (
        <Link to="/order/1/payment/1" className="no_style">
          <div className="payment lite">
            <h1 className="amount">{payment.amount}</h1>
            <div className="details">
              <h1> {payment.projectName} </h1>
              <p> {payment.nameSHG} </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
