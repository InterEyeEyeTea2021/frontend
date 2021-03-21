import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL } from "../constants/constants";
import { getPlaceholderImage } from "../helpers";
import { useAuth, SHGUser } from "../hooks/Auth";
import { SHGprofileData } from "../types";
import toast from "react-hot-toast";
import * as Icon from "react-feather";

interface Product {
  product_id: number;
  shg_id: number;
  name: string;
  description: string;
  image_uri: string;
  min_size: string;
  price: string;
}

export default function Portfolio() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  let history = useHistory();

  let urlParams: { shg_id: string } = useParams();

  const auth = useAuth();

  const is_sme = auth?.user && auth.user.user_type === "SME";
  const url_set = urlParams.shg_id != undefined;
  let [shg_id, setSHG_id] = useState<number>();
  let [user_data, setUserData] = useState<any>();

  useEffect(() => {
    console.log(urlParams.shg_id);
    if (!url_set) {
      setUserData(auth?.user as SHGUser);
      setSHG_id((auth?.user as SHGUser).shg_id);
      // console.log(auth?.user);
    } else {
      setSHG_id(Number(urlParams.shg_id));
      axios
        .get(`${BACKEND_URL}/users/shg`)
        .then((res) => {
          // console.log(res.data);
          let shg: SHGprofileData = res.data.filter((u: SHGprofileData) => {
            return u.shg_id === Number(urlParams.shg_id);
          })[0];
          if (shg) {
            setUserData({
              ...shg,
              name_SHG: shg.name,
              industry_type: shg.industry_type,
              profile_image_uri: shg.image_uri,
              production_cap: shg.prod_capacity,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [urlParams]);

  const acceptPls = (e: React.MouseEvent) => {
    setIsLoading(true);
    toast.success("Connection request sent");

    window.setTimeout(() => {
      toast.success("Connection request accepted!");
      setIsLoading(false);
      setAccepted(true);
    }, 3000);
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/product/shg/${shg_id}`)
      .then((res) => {
        console.log(res.data, "shg products");
        res.data.reverse();
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [shg_id]);

  return (
    <div className="main_content">
      <div className="full_image">
        <img
          src={
            user_data?.profile_image_uri ?? getPlaceholderImage(user_data?.name)
          }
          alt=""
        />
      </div>
      <div className="user_panel">
        <div className="name">{user_data?.name}</div>
        {!url_set && (
          <button
            className="button small default"
            onClick={(e) => {
              auth?.signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </button>
        )}
        {!accepted
          ? url_set && (
              <button
                className="button default"
                onClick={acceptPls}
                disabled={isLoading}
              >
                {isLoading ? "Request Sent" : "Connect"}
              </button>
            )
          : ""}
      </div>

      {accepted ? (
        <div className="call_box">
          <div className="details">
            <p>{user_data?.phone}</p>
          </div>
          <div className="call">
            <Icon.PhoneCall></Icon.PhoneCall>
          </div>
        </div>
      ) : (
        ""
      )}
      <hr />
      <TitleHeader
        title="Portfolio"
        user_type={auth?.user?.user_type as string}
      />
      <div className="detail">
        <div className="label">Name of SHG</div>
        <div className="value">{user_data?.name_SHG}</div>
      </div>

      {/* <div className="detail description">
        <div className="label">Description</div>
        <div className="value"></div>
      </div> */}

      <div className="detail">
        <div className="label">Industry Type</div>
        <div className="value">{user_data?.industry_type}</div>
      </div>
      {/* 
      <div className="detail">
        <div className="label">Production Capacity</div>
        <div className="value">{user_data?.production_cap}</div>
      </div>

      <div className="detail">
        <div className="label">Order Sizes</div>
        <div className="value">{user_data?.order_size}</div>
      </div> */}

      {!is_sme && !url_set && (
        <button
          className="button primary"
          onClick={(e) => {
            history.push(`/product/add`);
          }}
        >
          Add Product
        </button>
      )}

      <hr />

      <h2>Products</h2>
      <div className="cards products">
        {products.map((p, i) => (
          <Link to={`/product/${p.product_id}`} className="no_style">
            <div className="card product">
              <img src={p.image_uri} alt="" />
              <div>
                <h1>{p.name}</h1>
                <p>{p.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
