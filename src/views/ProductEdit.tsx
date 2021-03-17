import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL } from "../constants/constants";
import { useAuth } from "../hooks/Auth";
import BidForm from "./BidForm";

export default function ProductEdit() {
  const { register, handleSubmit, errors } = useForm();
  let { id }: { id: string } = useParams();
  let auth = useAuth();

  const data = {
    image_uri: "Image Link",
    name: "Product X",
    description: "Short detail of the prod",
    min_size: 10,
    price: 100,
  };

  const onSubmit = (data: any) => {
    // setIsLoading(true);
    axios
      .post(`${BACKEND_URL}/product/`, data, auth?.authHeader())
      .then((res) => {
        console.log(res.data, "product created");
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("Submitted Form Data: ", data);
  };

  return (
    <div className="main_content">
      <TitleHeader title="Edit Product" user_type="SHG" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="prod_name">Name of Product</label>
        <input
          name="name"
          id="prod_name"
          placeholder="Product Name"
          defaultValue={data.name}
          ref={register({
            required: true,
          })}
        />

        <label htmlFor="description">Description</label>
        <input
          name="description"
          id="description"
          placeholder="Description"
          defaultValue={data.description}
          ref={register({
            required: true,
          })}
        />

        {/* <label htmlFor="media">Attach Media</label>
        <input
          type="file"
          accept=" text/csv"
          id="media"
          // onChange={}
        /> */}

        <label htmlFor="description">Image Link</label>
        <input
          name="image_uri"
          id="image_uri"
          placeholder="Image Link"
          defaultValue={data.image_uri}
          ref={register({
            required: true,
          })}
        />

        <h2>Order Parameters</h2>

        <label htmlFor="min_size">Minimum Size</label>
        <input
          name="min_size"
          id="min_size"
          placeholder="Minimum Size"
          defaultValue={data.min_size}
          ref={register({
            required: true,
          })}
        />

        <label htmlFor="price">Price</label>
        <input
          name="price"
          id="price"
          placeholder="Price"
          defaultValue={data.price}
          ref={register({
            required: true,
          })}
        />

        <button type="submit" className="button primary">
          Add Product
        </button>
      </form>
    </div>
  );
}
