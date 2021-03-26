import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_IMGBB, BACKEND_URL } from "../constants/constants";
import TitleHeader from "../component/TitleHeader";
import { SMEUser, useAuth } from "../hooks/Auth";
import toast from "react-hot-toast";
import { useHistory, useParams } from "react-router-dom";
import * as Icon from "react-feather";
import Modal from "react-modal";

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
  const { register, handleSubmit, errors, getValues } = useForm();
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [milestoneId, setMilestoneId] = useState<number>();

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

  const handleModalOpen = (i: number) => {
    setMilestoneId(i);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    console.log(getValues("milestone0description"));
    setOpenModal(false);
  };

  const onSubmit = (data: any) => {
    setIsLoading(true);
    console.log("Submitted Form Data: ", data);

    if (data.media.length > 0) {
      // For tender image
      const e = data.media[0];
      const d = new FormData();
      let photograph;
      d.append("image", e);

      // For plane image
      const f = data.plan[0];
      const h = new FormData();
      let plan;
      h.append("image", f);
      axios
        .all([
          axios.post("https://api.imgbb.com/1/upload?key=" + API_IMGBB, d),
          axios.post("https://api.imgbb.com/1/upload?key=" + API_IMGBB, h),
        ])
        .then(
          axios.spread((resp1: any, resp2: any) => {
            photograph = resp1.data.data.image.url;
            plan = resp2.data.data.image.url;

            const request_data = {
              ...data,
              plan_uri: plan,
              sme_id: (auth?.user as SMEUser).sme_id,
              milestones: [
                {
                  name: data.milestone0,
                  description: data.milestone0description,
                  media: [],
                },
                {
                  name: data.milestone1,
                  description: data.milestone1description,
                  media: [],
                },
                {
                  name: data.milestone2,
                  description: data.milestone2description,
                  media: [],
                },
                {
                  name: data.milestone3,
                  description: data.milestone3description,
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
                request_data
                // auth?.authHeader()
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
        )
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const milestones = [
    { name: "Acquire Materials" },
    { name: "Start Production" },
    { name: "Finish Production" },
    { name: "Ship the Product" },
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

        <h2>Payments</h2>

        <label htmlFor="order_completion">Total Value</label>
        <input
          name="completion"
          id="completion"
          placeholder="Price"
          ref={register({
            required: true,
          })}
        />

        <label htmlFor="advanced">Advanced (Min. 10%)</label>
        <input
          name="advanced"
          id="advanced"
          placeholder="Price"
          ref={register({
            required: true,
          })}
        />

        <hr />

        <label htmlFor="plan">Attach Plan</label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="plan"
          name="plan"
          ref={register({ required: false })}
          // onChange={}
        />

        <h2>Milestones</h2>

        <ol>
          {milestones.map((m, index) => (
            <li>
              <div className="form-milestone">
                <input
                  name={"milestone" + index}
                  id={"milestone" + index}
                  defaultValue={m.name}
                  ref={register({
                    required: true,
                  })}
                />
                <div
                  className="form-fileplus"
                  onClick={() => handleModalOpen(index)}
                >
                  <Icon.FilePlus />
                </div>
              </div>
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

      <Modal
        isOpen={openModal}
        onRequestClose={handleModalClose}
        contentLabel="Confirm Complete Modal"
      >
        <h1>Milestone Details</h1>
        <label htmlFor="milestone-name">Milestone</label>
        <input
          name={`milestone${milestoneId}`}
          defaultValue={getValues(`milestone${milestoneId}`)}
          ref={register({
            required: true,
          })}
        />
        <label htmlFor="milestone-description">Description</label>
        <input
          name={`milestone${milestoneId}description`}
          id={`milestone${milestoneId}description`}
          placeholder="Milestone Description"
          defaultValue={getValues(`milestone${milestoneId}description`)}
          ref={register({
            required: false,
          })}
        />
        <button onClick={handleModalClose}>Update</button>

        <button onClick={handleModalClose} className="default">
          Close
        </button>
      </Modal>
    </div>
  );
}
