import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BACKEND_URL, profile_pics } from "../constants/constants";
import { SHGUser, useAuth } from "../hooks/Auth";
import axios from "axios";
import TitleHeader from "../component/TitleHeader";
import { prod_images } from "../constants/constants";
import { Link, useHistory } from "react-router-dom";

interface data {
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
}

interface Tender {
  id: number;
  name: string;
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
    profile_image_uri: string;
    phone: string;
  };
  bids: {
    amount: string;
    shg_id: number;
    tender_id: number;
  }[];
}

export default function DashboardSHG() {
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [tenders, setTenders] = useState<Tender[]>([]);
  const [data, setData] = useState<data>({
    ongoing_orders: [],
    completed_orders: [],
  });

  let history = useHistory();

  const is_sme = auth?.user && auth.user.user_type === "SME";
  let user_data: any;
  if (!is_sme) {
    user_data = auth?.user as SHGUser;
    console.log(auth?.user);
  }

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/order/shg`, {
        headers: {
          Authorization: `Bearer ${auth?.user?.access_token}`,
        },
        params: {
          id: user_data.shg_id,
        },
      })
      .then((res) => {
        console.log(
          res.data.filter((o: any) => o.state === "created"),
          "ongoing orders"
        );
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
      .get(`${BACKEND_URL}/tender/all`, {
        headers: {
          Authorization: `Bearer ${auth?.user?.access_token}`,
        },
      })
      .then((res) => {
        for (var t of res.data) {
          for (var bid of t.bids) {
            if (bid.shg_id == user_data.shg_id) {
              setTenders((prev) => [...prev, t]);
              // console.log(t);
              break;
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [auth]);

  return (
    <div className="main_content dashboard dashboard_shg">
      <TitleHeader title="Dashboard" user_type="SHG" />

      <h2>Ongoing Orders</h2>
      {data?.ongoing_orders.length > 0 ? (
        data?.ongoing_orders.map((order, i) => (
          <Link to={`/order/${order.order_id}`} className="no_style">
            <div className="order">
              <div className="image">
                <img src={order?.media[0].uri} alt="" />
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

      <h2> Bids </h2>
      {tenders.reverse() &&
        tenders.map((tender, i) => (
          <Link to={`/bid/${tender.id}`} className="no_style">
            <div className="bid">
              <div className="image">
                <img src={tender.media[0].uri} alt="" />
              </div>
              <div className="details">
                <h1>{tender.name}</h1>
                <p> {tender.bids.length} Bid </p>
              </div>
            </div>
          </Link>
        ))}

      <button
        className="button primary"
        onClick={(e) => {
          history.push(`/search`);
        }}
      >
        Create Bid
      </button>

      <h2>Completed Orders</h2>
      {data?.completed_orders.length > 0 ? (
        data?.completed_orders.map((order, i) => (
          <Link to={`/order/${order.order_id}`} className="no_style">
            <div className="order">
              <div className="image">
                <img src={order?.media[0].uri} alt="" />
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
      {data.payments.map((payment, id) => (
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

      <h2> Portfolio </h2>
      <div className="order">
        <div className="image">
          <img
            src={
              auth?.user?.profile_image_uri ??
              `http://tinygraphs.com/isogrids/${auth?.user?.name}?theme=seascape&numcolors=4`
            }
            alt=""
          />
        </div>
        <div className="details">
          <h1>{user_data.name_SHG}</h1>
          <p>Production Capacity: {user_data.production_cap}</p>
          <p>Order Size: {user_data.order_size}</p>
        </div>
      </div>
      <button
        className="button primary"
        onClick={(e) => {
          history.push(`/portfolio`);
        }}
      >
        Show Portfolio
      </button>
    </div>
  );
}
