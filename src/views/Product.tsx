import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TitleHeader from "../component/TitleHeader";
import BidForm from "./BidForm";

export default function Product() {
  const { register, handleSubmit, errors } = useForm();

  const data = {
    image: "",
    prod_name: "Product X",
    description: "Short detail of the prod",
    min_size: 10,
    price: 100,
    media: [
      {
        type: "image",
        uri: "https://i.imgur.com/khUO2T7.png",
      },
      {
        type: "image",
        uri: "https://i.imgur.com/khUO2T7.png",
      },
      {
        type: "image",
        uri: "https://i.imgur.com/khUO2T7.png",
      },
    ],
  };

  const onSubmit = (data: any) => {
    // setIsLoading(true);
    console.log("Submitted Form Data: ", data);
  };

  return (
    <div className="main_content">
      <TitleHeader title="Product" user_type="SHG" />

      <div className="form" style={{ width: "90%" }}>
        <div className="detail">
          <div className="label">Name of Product</div>
          <div className="value">{data.prod_name}</div>
        </div>

        <div className="detail">
          <div className="label">Description</div>
          <div className="value">{data.description}</div>
        </div>

        <div className="media_wrapper">
          {data.media.map((i) => (
            <img src={i.uri} alt="" />
          ))}
        </div>

        <div className="detail">
          <div className="label">Minimum Size</div>
          <div className="value">{data.min_size}</div>
        </div>

        <div className="detail">
          <div className="label">Price</div>
          <div className="value">{data.price}</div>
        </div>

        <button className="button primary">Edit Product</button>
        <button className="button">Delete</button>
      </div>
    </div>
  );
}
