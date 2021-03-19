import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_IMGBB, BACKEND_URL } from "../constants/constants";
import TitleHeader from "../component/TitleHeader";
import { SMEUser, useAuth } from "../hooks/Auth";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
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

export default function TenderForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product>();
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");

  let { id }: { id: string } = useParams();
  let auth = useAuth();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/product/${id}`)
      .then((res) => {
        console.log(res.data, "product");
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    console.log("Submitted Form Data: ", data);

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

          const request_data = {
            ...data,
            sme_id: (auth?.user as SMEUser).sme_id,
            milestones: [
              {
                description: data.milestone0,
                media: [],
              },
              {
                description: data.milestone1,
                media: [],
              },
              {
                description: data.milestone2,
                media: [],
              },
              {
                description: data.milestone3,
                media: [],
              },
            ],
            media: [
              {
                uri: photograph,
                type: "image",
              },
            ],
          };

          axios
            .post(
              `${BACKEND_URL}/tender/create`,
              request_data,
              auth?.authHeader()
            )
            .then((res) => {
              setIsLoading(false);
              toast.success("Tender Created");
              history.push("/dashboard");
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(photograph);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const milestones = [
    {
      name: "Milestone 1",
    },
    {
      name: "Milestone 2",
    },
    {
      name: "Milestone 3",
    },
    {
      name: "Milestone 4",
    },
  ];

  return (
    <div className="main_content">
      <TitleHeader title="Create Tender" user_type="SME" />

      <h2>Tender Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="tender_name">Tender Name</label>
        <input
          name="tender_name"
          id="tender_name"
          placeholder="Tender Name"
          defaultValue={product != undefined ? `${product?.name} - order` : ""}
          ref={register({
            required: true,
          })}
        />

        <label htmlFor="industry_type">Industry Type</label>
        <input
          name="industry_type"
          id="industry_type"
          defaultValue={auth?.user?.industry_type}
          ref={register({
            required: true,
          })}
        />

        <label htmlFor="description">Description</label>
        <input
          name="description"
          id="description"
          placeholder="Description"
          defaultValue={product != undefined ? `${product?.description}` : ""}
          ref={register({
            required: true,
          })}
        />

        {/* <label htmlFor="skills_req">Skills Required</label>
        <input
          name="skills_req"
          id="skills_req"
          placeholder="Skills Required"
          ref={register({
            required: true,
          })}
        /> */}

        {/* <label htmlFor="location">Location</label>
        <input
          name="location"
          id="location"
          placeholder="Location"
          ref={register({
            required: true,
          })}
        /> */}

        <label htmlFor="media">Attach Media</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="media"
          name="media"
          ref={register({ required: true })}
          // onChange={}
        />

        <hr />

        {/* <h2>Payments</h2>

        <label htmlFor="order_completion">Order Completion</label>
        <input
          name="order_completion"
          id="order_completion"
          placeholder="Order Completion"
          ref={register({
            required: true,
          })}
        />

        <label htmlFor="advanced">Advanced (Empty if not required)</label>
        <input
          name="advanced"
          id="advanced"
          placeholder="Price"
          ref={register({
            required: true,
          })}
        />

        <hr /> */}

        <h2>Milestones</h2>

        <ol>
          {milestones.map((m, index) => (
            <li>
              <input
                name={"milestone" + index}
                id={"milestone" + index}
                placeholder={m.name}
                ref={register({
                  required: true,
                })}
              />
            </li>
          ))}
        </ol>
        {/* <button className="button">Add Milestone</button> */}

        <button type="submit" disabled={isLoading}>
          {isLoading ? <Icon.Loader className="loader" /> : "Create Tender"}
        </button>
        {/* <input type="submit" value="Invite SHGs" disabled={isLoading} /> */}
        <div className="error">{message}</div>
      </form>
    </div>
  );
}
