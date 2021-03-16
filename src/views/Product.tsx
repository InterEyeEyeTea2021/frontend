import React, { useState } from "react";
import { Link } from "react-feather";
import { useForm } from "react-hook-form";
import TitleHeader from "../component/TitleHeader";
import { useAuth } from "../hooks/Auth";
import BidForm from "./BidForm";

export default function Product() {
  const { register, handleSubmit, errors } = useForm();
  const auth = useAuth();
  const is_sme = auth?.user && auth.user.user_type === "SME";

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
      <TitleHeader
        title="Product"
        user_type={auth?.user?.user_type as string}
      />

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
      {is_sme ? (
        <Link to="/tender">Create Tender</Link>
      ) : (
        <div className="edit">
          <button className="button primary">Edit Product</button>
          <button className="button">Delete</button>
        </div>
      )}
    </div>
  );
}
