import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "../constants/constants";
import { SMEUser, useAuth } from "../hooks/Auth";
import axios from "axios";
import TitleHeader from "../component/TitleHeader";
import { prod_images } from "../constants/constants";
import { Link } from "react-router-dom";

interface Tender {
  id: number;
  // tender_name: string;
  tender_name: string;
  state: string;
  description: string;
  media: {
    uri: string;
    type: string;
  }[];
  milestones: {
    description: string;
    media: {
      uri: string;
      type: string;
    }[];
  }[];
  sme: {
    id: number;
    name: string;
  };
}

interface Data {
  ongoing_orders: {
    order_id: number;
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
      description: string;
      media: {
        uri: string;
        type: string;
      }[];
    }[];
  }[];

  completed_orders: {
    order_id: number;
    description: string;
    contract: string;
    order_name: string;
    name_SHG: string;

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
      description: string;
      media: {
        uri: string;
        type: string;
      }[];
    }[];
  }[];

  tenders: Tender[];
}

export default function DashboardSME() {
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [data, setData] = useState<Data>({
    ongoing_orders: [],
    tenders: [],
    completed_orders: [],
  });

  const is_sme = auth?.user && auth.user.user_type === "SME";
  let user_data: any;
  if (is_sme) {
    user_data = auth?.user as SMEUser;
    // console.log(auth?.user);
  }

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/order/sme`, {
        headers: {
          Authorization: `Bearer ${auth?.user?.access_token}`,
        },
        params: {
          id: user_data.sme_id,
        },
      })
      .then((res) => {
        console.log(res.data, "orders");
        setData({
          ...data,
          ongoing_orders: res.data.filter(
            (order: any) => order.state === "created"
          ),
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
          Authorization: `Bearer ${auth?.user?.access_token}`,
        },
        params: {
          id: user_data.sme_id,
        },
      })
      .then((res) => {
        console.log(res.data, "tenders");
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
      {data?.ongoing_orders.length > 0 ? (
        data?.ongoing_orders.map((order, i) => (
          <Link to={`/order/${order.order_id}`} className="no_style">
            <div className="order">
              <div className="image">
                <img src={order.media[0].uri} alt="" />
              </div>
              <div className="details">
                <h1>{order.order_name}</h1>
                <p> {order.description} </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p> No orders yet</p>
      )}

      <h2>Tenders</h2>
      {data?.tenders
        .map((tender, i) => (
          <Link to={`/tender/status/${tender.id}`} className="no_style">
            <div className="tender">
              <div className="image">
                <img src={tender.media[0].uri} alt="" />
              </div>
              <div className="details">
                <h1>{tender.tender_name}</h1>
                <p> {tender.description} </p>
                {/* <p> {tender.bids} BIDS RECEIVED </p> */}
              </div>
            </div>
          </Link>
        ))
        .reverse()}

      <Link className="button" to="/tender">
        Create Tender
      </Link>

      <h2>Completed Orders</h2>
      {data?.completed_orders.length > 0 ? (
        data?.completed_orders.map((order, i) => (
          <Link to={`/order/${order.order_id}`} className="no_style">
            <div className="order">
              <div className="image">
                <img src={order.media[0].uri} alt="" />
              </div>
              <div className="details">
                <h1>{order.order_name}</h1>
                <p> {order.description} </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p> No orders yet </p>
      )}

      {/* <h2> Payments </h2>
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
      ))} */}
    </div>
  );
}
