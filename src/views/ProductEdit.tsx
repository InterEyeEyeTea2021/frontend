import React, { useState } from "react";
import { useForm } from "react-hook-form";
import BidForm from "./BidForm";

export default function ProductEdit() {
  const { register, handleSubmit, errors } = useForm();

  const data = {
    image: "",
    prod_name: "Product X",
    description: "Short detail of the prod",
    min_size: 10,
    price: 100,
  };

  const onSubmit = (data: any) => {
    // setIsLoading(true);
    console.log("Submitted Form Data: ", data);
  };

  return (
    <div className="authform">
      <h1>Product</h1>
      <div className="form" style={{ width: "90%" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="prod_name">Name of Product</label>
          <input
            name="prod_name"
            id="prod_name"
            placeholder="Product Name"
            defaultValue={data.prod_name}
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

          <label htmlFor="media">Attach Media</label>
          <input
            type="file"
            accept=" text/csv"
            id="media"
            style={{
              maxWidth: 300,
            }}
            // onChange={}
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

          <button className="button primary">Add Product</button>
        </form>
      </div>
    </div>
  );
}
