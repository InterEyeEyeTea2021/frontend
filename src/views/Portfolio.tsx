import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function Portfolio() {
  const { register, handleSubmit, errors } = useForm();

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
      <h1>Portfolio</h1>
      <div className="form" style={{ width: "90%" }}>
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
        <div className="products">
          {data.products.map((p, i) => (
            <div className="product">
              <img src={p.image} alt="" />
              <div>
                <h1>{p.name}</h1>
                <p>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
