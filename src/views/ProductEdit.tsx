import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router";
import TitleHeader from "../component/TitleHeader";
import { API_IMGBB, BACKEND_URL } from "../constants/constants";
import { useAuth } from "../hooks/Auth";
import * as Icon from "react-feather";

export default function ProductEdit() {
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  let { id }: { id: string } = useParams();
  let auth = useAuth();
  const history = useHistory();

  const onSubmit = (data: any) => {
    // setIsLoading(true);
    console.log("Submitted Form Data: ", data);
    setIsLoading(true);

    if (data.media.length > 0) {
      const e = data.media[0];
      const d = new FormData();
      let photograph;
      console.log(e);
      d.append("image", e);
      axios
        .post("https://api.imgbb.com/1/upload?key=" + API_IMGBB, d)
        .then((resp) => {
          photograph = resp.data.data.image.url;
          // Post the image link to the backend
          console.log(photograph);
          axios
            .post(
              `${BACKEND_URL}/product/`,
              {
                ...data,
                image_uri: photograph,
              },
              auth?.authHeader()
            )
            .then((res) => {
              // console.log(res.data, "product created");
              setIsLoading(false);
              toast.success("Product added successfully!");
              history.push("/portfolio");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      // Post to backend without image?
    }
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
          ref={register({
            required: true,
          })}
        />

        <label htmlFor="description">Description</label>
        <input
          name="description"
          id="description"
          placeholder="Description"
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
        <label htmlFor="media">Attach Media</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="media"
          name="media"
          ref={register}
        />

        <h2>Order Parameters</h2>

        <label htmlFor="min_size">Minimum Size</label>
        <input
          name="min_size"
          id="min_size"
          placeholder="Minimum Size"
          ref={register({
            required: true,
          })}
        />

        <label htmlFor="price">Price</label>
        <input
          name="price"
          id="price"
          placeholder="Price"
          ref={register({
            required: true,
          })}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? <Icon.Loader className="loader" /> : "Add Product"}
        </button>
      </form>
    </div>
  );
}
