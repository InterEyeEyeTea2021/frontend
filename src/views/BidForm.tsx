import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import TitleHeader from "../component/TitleHeader";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import { useParams } from "react-router";
import toast from "react-hot-toast";

interface tender {
  id: number;
  // tender_name: string;
  state: string;
  description: string;
  media: {
    uri: string;
    type: string;
  }[];
  milestones: {
    description: string;
    media: {
      uri: string;
      type: string;
    }[];
  }[];
  sme: {
    id: number;
    name: string;
  };
}

export default function BidForm() {
  const { register, handleSubmit, errors } = useForm();
  const [tender, setTender] = useState<tender>();
  let { id }: { id: string } = useParams();

  const milestones = [
    { name: "Milestone 1" },
    { name: "Milestone 2" },
    { name: "Milestone 3" },
    { name: "Milestone 4" },
  ];

  const data = {
    tender_name: "Tender Name",
    industry_type: "Agriculture",
    description: "Description",
    skills_req: "Skills Required",
    location: "Location",
    payments: [
      {
        keyname: "completion",
        pay_name: "Order Completion",
        suggested_value: 2000,
      },
      { keyname: "advanced", pay_name: "Advanced", suggested_value: null },
    ],
    milestones: [
      { name: "Milestone 1" },
      { name: "Milestone 2" },
      { name: "Milestone 3" },
      { name: "Milestone 4" },
    ],
  };

  const onSubmit = (data: {
    paymentcompletion: string;
    paymentadvanced: string;
  }) => {
    console.log(data);
    // Put the toast inside the API Call
    toast.success("Bid created!");
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/tender/id`, {
        params: {
          id: id,
        },
      })
      .then((res) => {
        console.log(res);
        setTender(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main_content">
      <TitleHeader title="Create Bid" user_type="SHG" />
      <div className="full_image">
        <img src={tender?.media[0].uri} alt="" />
      </div>
      <div className="sme-details call_box">
        <div className="details">
          <h1>{tender?.sme.name}</h1>
          <p>XXXX XX XXXX</p>
        </div>
        <div className="call">
          <Icon.PhoneCall></Icon.PhoneCall>
        </div>
      </div>

      <h2>Tender Details</h2>
      <div className="detail">
        <div className="label">Tender Name</div>
        <div className="value">{data.tender_name}</div>
      </div>
      <div className="detail">
        <div className="label">Industry Type</div>
        <div className="value">{data.industry_type}</div>
      </div>

      <div className="detail">
        <div className="label">Description</div>
        <div className="value">{tender?.description}</div>
      </div>

      <div className="detail">
        <div className="label">Skills Required</div>
        <div className="value">{data.skills_req}</div>
      </div>

      <div className="detail">
        <div className="label">Location</div>
        <div className="value">{data.location}</div>
      </div>

      <hr />

      <h2>Milestones</h2>

      <div className="milestones">
        {tender?.milestones.map((m, index) => (
          <div className="milestone">
            <div className="index">{index + 1}.</div>
            <div className="name">{m.description}</div>
            {/* <div className="check">check</div> */}
          </div>
        ))}
      </div>

      <hr />

      <h2>Payments</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {data.payments.map((p, i) => (
          <div className="payment_details">
            <div className="detail">
              <div className="label">{p.pay_name} (Suggested by SME)</div>
              <div className="value">
                {p.suggested_value ? p.suggested_value : "Nil"}
              </div>
            </div>

            <label htmlFor={"payment" + p.keyname}>{p.pay_name}</label>
            <input
              name={"payment" + p.keyname}
              id={"payment" + p.keyname}
              placeholder="Price"
              ref={register({
                required: false,
              })}
            />
            <br />
          </div>
        ))}
        <button className="button" type="submit">
          Bid for Order
        </button>
      </form>
    </div>
  );
}
