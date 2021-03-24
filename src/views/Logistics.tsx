import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import TitleHeader from "../component/TitleHeader";
import { Link, useHistory, useParams } from "react-router-dom";
import { SHGUser, SMEUser, useAuth } from "../hooks/Auth";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { Milestone } from "../types";

interface OrderData {
  order_id: number;
  state: string;
  description: string;
  contract: string;
  order_name: string;
  name_SHG: string;
  completion: string;

  media: {
    uri: string;
    type: string;
  }[];

  sme: {
    id: number;
    name: string;
    phone: string;
    profile_image_uri: string;
  };

  shg: {
    id: number;
    name: string;
    phone: string;
    profile_image_uri: string;
  };

  milestones: {
    name: string;
    description: string;
    media: {
      uri: string;
      type: string;
    }[];
  }[];
}

Modal.setAppElement("#root");

export default function Logistics() {
  const auth = useAuth();
  let urlParams: { id: string } = useParams();
  const is_sme = auth?.user && auth.user.user_type === "SME";

  const user_url_param = is_sme ? "sme" : "shg";

  const [orderData, setOrderData] = useState<OrderData>();

  let id: any;
  if (!is_sme) {
    id = (auth?.user as SHGUser)?.shg_id || (auth?.user as SMEUser)?.sme_id;
    console.log(auth?.user);
  } else {
  }

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/order/${user_url_param}?id=${id}`)
      .then((res) => {
        console.log(res.data, "order");
        let order: OrderData = res.data.filter((o: OrderData) => {
          return o.order_id == Number(urlParams.id);
        })[0];
        if (order) {
          setOrderData(order);
          console.log(order, "this order");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const logistics = [
    {
      name: "Delihivery",
      image: "https://i.imgur.com/iVEE3A9.png",
      price: "200",
      time: "5 days",
    },
    {
      name: "Blue Dart",
      image: "https://i.imgur.com/Bfcx3pz.png",
      price: "300",
      time: "4 days",
    },
    {
      name: "DHL",
      image: "https://i.imgur.com/HkPfbYL.png",
      price: "250",
      time: "6 days",
    },

    {
      name: "FedEx",
      image: "https://i.imgur.com/Iti3CjN.png",
      price: "350",
      time: "5 days",
    },
  ];

  return (
    <div className="main_content">
      <TitleHeader
        title="Logistics"
        user_type={auth?.user?.user_type as string}
      />
      <h2>
        Order <span className="tag">{orderData?.state}</span>
      </h2>

      <div className="detail description">
        <div className="label">Description</div>
        <div className="value">{orderData?.description}</div>
      </div>

      <hr />

      <h2>Available Logistics</h2>
      <div className="cards">
        {logistics.map((l) => (
          <div className="card logistics">
            <img src={l.image} alt="" />
            <div>
              <h1>{l.name}</h1>
              <p>
                &#x20B9;{l.price} &bull; {l.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr />

      {auth?.user?.user_type === "SME" ? (
        <div className="call_box">
          <img
            // src={
            //   orderData?.shg.profile_image_uri ??
            //   `http://tinygraphs.com/isogrids/${orderData?.shg.name}?theme=seascape&numcolors=4`
            // }
            src="https://i.imgur.com/0AJf1LN.png"
            alt=""
          />
          <div className="details">
            <h1>{orderData?.shg.name}</h1>
            <p>{orderData?.shg.phone}</p>
          </div>
          <div className="call">
            <Icon.PhoneCall></Icon.PhoneCall>
          </div>
        </div>
      ) : (
        <div className="call_box">
          <img
            // src={
            //   orderData?.sme.profile_image_uri ??
            //   `http://tinygraphs.com/isogrids/${orderData?.sme.name}?theme=seascape&numcolors=4`
            // }
            src="https://i.imgur.com/0AJf1LN.png"
            alt=""
          />
          <div className="details">
            <h1>{orderData?.sme.name}</h1>
            <p>{orderData?.sme.phone}</p>
          </div>
          <div className="call">
            <Icon.PhoneCall></Icon.PhoneCall>
          </div>
        </div>
      )}

      <hr />
    </div>
  );
}
