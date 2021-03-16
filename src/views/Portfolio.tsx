import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import TitleHeader from "../component/TitleHeader";
import { prod_images } from "../constants/constants";
import { authContext, useAuth } from "../hooks/Auth";

export default function Portfolio() {
  const { register, handleSubmit, errors } = useForm();

  let history = useHistory();

  const auth = useAuth();

  const is_sme = auth?.user && auth.user.user_type === "SME";

  const data = {
    shg_name: "Name of SHG",
    industry_type: "Agriculture",
    description: "Description",
    prod_cap: "Production Capacity",
    order_sizes: "Order Sizes",
    location: "Location",
    products: [
      {
        image: "https://i.imgur.com/khUO2T7.png",
        name: "Product X",
        description: "Short detail of the prod",
      },
      {
        image: "https://i.imgur.com/khUO2T7.png",
        name: "Product X",
        description: "Short detail of the prod",
      },
      {
        image: "https://i.imgur.com/khUO2T7.png",
        name: "Product X",
        description: "Short detail of the prod",
      },
    ],
  };

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
        <div className="value">{data.shg_name}</div>
      </div>

      <div className="detail">
        <div className="label">Description</div>
        <div className="value">{data.description}</div>
      </div>

      <div className="detail">
        <div className="label">Industry Type</div>
        <div className="value">{data.industry_type}</div>
      </div>

      <div className="detail">
        <div className="label">Production Capacity</div>
        <div className="value">{data.prod_cap}</div>
      </div>

      <div className="detail">
        <div className="label">Order Sizes</div>
        <div className="value">{data.order_sizes}</div>
      </div>

      <div className="detail">
        <div className="label">Location</div>
        <div className="value">{data.location}</div>
      </div>

      <button className="button primary">Add Product</button>
      <button className="button">Edit</button>

      <hr />

      <h2>Products</h2>
      <div className="cards products">
        {data.products.map((p, i) => (
          <Link to={"/product/" + i} className="no_style">
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
