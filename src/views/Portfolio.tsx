import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL, prod_images } from "../constants/constants";
import { authContext, useAuth, SMEUser, SHGUser } from "../hooks/Auth";

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
  const { register, handleSubmit, errors } = useForm();
  const [products, setProducts] = useState<Product[]>([]);

  let history = useHistory();

  const auth = useAuth();

  const is_sme = auth?.user && auth.user.user_type === "SME";
  let user_data;
  if (!is_sme) {
    user_data = auth?.user as SHGUser;
    console.log(auth?.user);
    console.log(user_data);
  }

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/product/shg/${auth?.user?.id}`)
      .then((res) => {
        console.log(res.data, "shg products");
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main_content">
      <TitleHeader
        title="Portfolio"
        user_type={auth?.user?.user_type as string}
      />

      {!is_sme && (
        <button
          className="button"
          onClick={(e) => {
            auth?.signout(() => {
              history.push("/");
            });
          }}
        >
          Signout
        </button>
      )}

      <div className="detail">
        <div className="label">Name of SHG</div>
        <div className="value">{user_data?.name_SHG}</div>
      </div>

      <div className="detail">
        <div className="label">Description</div>
        <div className="value"></div>
      </div>

      <div className="detail">
        <div className="label">Industry Type</div>
        <div className="value">{user_data?.industry_type}</div>
      </div>

      <div className="detail">
        <div className="label">Production Capacity</div>
        <div className="value">{user_data?.production_cap}</div>
      </div>

      <div className="detail">
        <div className="label">Order Sizes</div>
        <div className="value">{user_data?.order_size}</div>
      </div>

      {/* <div className="detail">
        <div className="label">Location</div>
        <div className="value">{data.location}</div>
      </div> */}

      <button className="button primary">Add Product</button>

      <hr />

      <h2>Products</h2>
      <div className="cards products">
        {products.map((p, i) => (
          <Link to={`/product/${p.product_id}`} className="no_style">
            <div className="card product">
              <img src={prod_images[i % 6]} alt="" />
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
