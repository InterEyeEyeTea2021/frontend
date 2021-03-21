import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import TitleHeader from "../component/TitleHeader";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import { SHGUser, useAuth } from "../hooks/Auth";
import { Bid, Tender } from "../types";
import toast from "react-hot-toast";

export default function BidStatus() {
  const { register, handleSubmit, errors } = useForm();
  const [tender, setTender] = useState<Tender>();
  const [bid, setBid] = useState<Bid>();
  const auth = useAuth();
  const urlParams: { id: string } = useParams();
  const history = useHistory();
  console.log(urlParams);

  const data = {
    tender_name: "Tender Name",
    industry_type: "Textile",
    description: "Description",
    skills_req: "Skills Required",
    location: "Location",
    payments: [
      { pay_name: "Order Completion", value: 2000, suggested_value: 1500 },
      { pay_name: "Advanced", value: null, suggested_value: 200 },
    ],
    quanity: 100,
    milestones: [
      { name: "Acquire Materials" },
      { name: "Start Production" },
      { name: "Finish Production" },
      { name: "Ship the Product" },
    ],
  };
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/tender/id`, {
        params: {
          id: urlParams.id,
        },
      })
      .then((res) => {
        let bid = res.data.data.bids.filter((b: Bid) => {
          return b.shg_id === (auth?.user as SHGUser).shg_id;
        })[0];

        console.log(bid);
        setBid(bid);
        setTender(res.data.data);

        // window.setTimeout(() => {
        //   axios
        //     .post(`${BACKEND_URL}/bid/acceptBid`, {
        //       id: bid.id,
        //       contract_uri: "https://google.com",
        //     })
        //     .then((res) => {
        //       toast.success("Your Bid has been Accepted!");

        //       window.setTimeout(
        //         () => toast.success("Redirecting to Dashboard"),
        //         3000
        //       );
        //       window.setTimeout(() => history.push("/dashboard"), 5000);
        //       console.log(res.data);
        //     });
        // }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const cancelBid = (e: React.MouseEvent) => {
    console.log(e.target);
  };

  return (
    <div className="main_content">
      <TitleHeader title="Bid Status" user_type="SHG" />

      <div className="full_image">
        <img src={tender?.media[0].uri} alt="" />
      </div>

      <div className="sme-details call_box">
        <img src="https://i.imgur.com/JhrA6LS.png" alt="" />
        <div className="details">
          <h1>{tender?.sme.name}</h1>
          {/* <p>XXXX XX XXXX</p> */}
        </div>
      </div>

      <h2>Tender Details</h2>
      <div className="detail">
        <div className="label">Product Name</div>
        <div className="value">{tender?.name}</div>
      </div>
      <div className="detail">
        <div className="label">Quantity</div>
        <div className="value">{data.quanity}</div>
      </div>
      <div className="detail">
        <div className="label">Industry Type</div>
        <div className="value">{data.industry_type}</div>
      </div>

      <div className="detail">
        <div className="label">Description</div>
        <div className="value">{tender?.description}</div>
      </div>

      <hr />

      <h2>Milestones</h2>

      <div className="milestones">
        {data.milestones.map((m, index) => (
          <div className="milestone">
            <div className="index">{index + 1}.</div>
            <div className="name">{m.name}</div>
            {/* <div className="check">check</div> */}
          </div>
        ))}
      </div>

      <hr />

      <h2>Payments</h2>

      {data.payments.map((p, i) => (
        <div className="payment_details">
          <div className="detail">
            <div className="label">{p.pay_name} (Suggested by SME)</div>
            <div className="value">
              {p.suggested_value ? p.suggested_value : "Nil"}
            </div>
          </div>
          <div className="detail">
            <div className="label">Your Bid</div>
            <div className="value">{p.value ? p.value : "Nil"}</div>
          </div>
        </div>
      ))}

      <button className="button default" onClick={cancelBid}>
        Cancel Bid
      </button>
    </div>
  );
}
