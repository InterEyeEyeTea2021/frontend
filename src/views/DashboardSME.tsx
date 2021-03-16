import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../constants/constants";
import { useAuth } from "../hooks/Auth";
import axios from "axios";
import TitleHeader from "../component/TitleHeader";
import { prod_images } from "../constants/constants";
import { Link } from "react-router-dom";

interface data {
  ongoing_orders: {
    id: number;
    image: string;
    contract: string;
    description: string;
    shg_id: number;
    sme_id: number;
    order_name: string;
    name_SHG: string;
    completion: string;
  }[];

  completed_orders: {
    id: number;
    image: string;
    contract: string;
    description: string;
    shg_id: number;
    sme_id: number;
    order_name: string;
    name_SHG: string;
  }[];

  tenders: {
    id: number;
    image: string;
    order_name: string;
    date: string;
    bids: string;
  }[];

  payments: {
    id: number;
    amount: string;
    project_name: string;
    name_SHG: string;
  }[];
}

export default function DashboardSME() {
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [data, setData] = useState<data>({
    ongoing_orders: [
      {
        id: 1,
        image: "https://i.imgur.com/khUO2T7.png",
        contract: "",
        description: "string",
        shg_id: 2,
        sme_id: 1,
        order_name: "Order Name",
        name_SHG: "Ram Setu SHG",
        completion: "75%",
      },
      {
        id: 3,
        image: "https://i.imgur.com/khUO2T7.png",
        contract: "",
        description: "string",
        shg_id: 2,
        sme_id: 1,
        order_name: "Order Name",
        name_SHG: "Not Ram Setu SHG",
        completion: "50%",
      },
    ],

    tenders: [
      {
        id: 1,
        image: "https://i.imgur.com/khUO2T7.png",
        order_name: "Order Name",
        date: "1st April 2021",
        bids: "2",
      },
    ],

    completed_orders: [
      {
        id: 2,
        image: "https://i.imgur.com/khUO2T7.png",
        contract: "",
        description: "string",
        shg_id: 2,
        sme_id: 1,
        order_name: "Order Name",
        name_SHG: "Ram Setu SHG",
      },
      {
        id: 4,
        image: "https://i.imgur.com/khUO2T7.png",
        contract: "",
        description: "string",
        shg_id: 2,
        sme_id: 1,
        order_name: "Order Name",
        name_SHG: "Not Ram Setu SHG",
      },
    ],

    payments: [
      {
        id: 2,
        amount: "2000",
        project_name: "Project Impossible",
        name_SHG: "Ram Setu again",
      },
      {
        id: 3,
        amount: "3000",
        project_name: "Project Impossible",
        name_SHG: "Ram Setu again",
      },
    ],
  });

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/order/sme`, {
        headers: {
          Authorization: `Bearer ${auth?.user?.jwt}`,
        },
        params: {
          id: auth?.user?.id,
        },
      })
      .then((res) => {
        console.log(
          // res.data.filter((order: any) => order.state === "created"),
          "orders"
        );
        setData({
          ...data,
          ongoing_orders: res.data.filter(
            (order: any) => order.state === "created"
          ),
        });
        setData({
          ...data,
          completed_orders: res.data.filter(
            (order: any) => order.state == "completed"
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${BACKEND_URL}/tender/sme`, {
        headers: {
          Authorization: `Bearer ${auth?.user?.jwt}`,
        },
        params: {
          id: auth?.user?.id,
        },
      })
      .then((res) => {
        // console.log(res.data, "tenders");
        setData({ ...data, tenders: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  return (
    <div className="main_content dashboard dashboard_shg">
      <TitleHeader title="Dashboard" user_type="SME" />
      <h2>Ongoing Orders</h2>
      {data?.ongoing_orders.map((order, i) => (
        <Link to={`/order/${order.id}`} className="no_style">
          <div className="order">
            <div className="image">
              <img src={prod_images[i % 6]} alt="" />
            </div>
            <div className="details">
              <h1>{order.name_SHG}</h1>
              <p> COMPLETION: {order.completion} </p>
            </div>
          </div>
        </Link>
      ))}

      <h2>Tenders</h2>
      {data?.tenders.map((tender, i) => (
        <Link to={`/tender/${tender.id}`} className="no_style">
          <div className="tender">
            <div className="image">
              <img src={prod_images[i % 6]} alt="" />
            </div>
            <div className="details">
              <h1>{tender.order_name}</h1>
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
      {data?.completed_orders.map((order, i) => (
        <Link to={`/order/${order.id}`} className="no_style">
          <div className="order">
            <div className="image">
              <img src={prod_images[i % 6]} alt="" />
            </div>
            <div className="details">
              <h1>{order.name_SHG}</h1>
            </div>
          </div>
        </Link>
      ))}

      <h2> Payments </h2>
      {data?.payments.map((payment, id) => (
        <Link to="/order/1/payment/1" className="no_style">
          <div className="payment lite">
            <h1 className="amount">{payment.amount}</h1>
            <div className="details">
              <h1> {payment.project_name} </h1>
              <p> {payment.name_SHG} </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
