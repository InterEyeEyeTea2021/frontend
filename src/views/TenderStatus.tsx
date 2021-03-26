import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import { isConstructSignatureDeclaration } from "typescript";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL, profile_pics } from "../constants/constants";
import { Bid } from "../types";
import toast from "react-hot-toast";

export default function TenderStatus() {
  const [tender, setTender] = useState<any>();
  const [bids, setBids] = useState<Bid[]>([]);

  let { id }: { id: string } = useParams();
  let history = useHistory();

  const data = {
    tender_name: "Tender Name",
    industry_type: "Textile",
    description: "Description",
    skills_req: "Skills Required",
    price: 2200,
    location: "Location",
    quanity: 100,
    bids: [
      {
        image: "https://i.imgur.com/khUO2T7.png",
        shg_name: "Company Name",
        bid: 2000,
      },
      {
        image: "https://i.imgur.com/khUO2T7.png",
        shg_name: "Company Name",
        bid: 1000,
      },
    ],
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
          id,
        },
      })
      .then((res) => {
        setTender(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${BACKEND_URL}/bid/getTenderBids`, {
        params: {
          id,
        },
      })
      .then((res) => {
        setBids(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBidAccept = (id: number, uri: string) => {
    axios
      .post(`${BACKEND_URL}/bid/acceptBid`, {
        id: id,
        contract_uri: uri,
      })
      .then((res) => {
        toast.success("The Bid has been Accepted!");

        window.setTimeout(
          () => toast.success("Redirecting to Dashboard"),
          3000
        );

        window.setTimeout(() => history.push("/dashboard"), 5000);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main_content tender_status">
      <TitleHeader title="Tender Status" user_type="SME" />

      <div className="full_image">
        <img src={tender?.media && tender?.media[0].uri} alt="" />
      </div>

      <div className="detail">
        <div className="label">Industry Type</div>
        <div className="value">{data.industry_type}</div>
      </div>

      <div className="detail">
        <div className="label">Quantity</div>
        <div className="value">{data.quanity}</div>
      </div>

      <div className="detail description">
        <div className="label">Description</div>
        <div className="value">{tender?.description}</div>
      </div>

      <div className="detail">
        <div className="label">Skills Required</div>
        <div className="value">{data.skills_req}</div>
      </div>
      <div className="detail">
        <div className="label">Price</div>
        <div className="value">{data.price}</div>
      </div>
      {/* <button className="button" onClick={() => history.push("/search")}>
        Invite SHGs
      </button> */}

      <hr />

      <h2>Bids</h2>
      {bids.map((b, i) => (
        <div className="bid">
          <div className="image">
            <img src={profile_pics[i % 2]} alt="" />
          </div>
          <div className="details">
            <h1>Producer</h1>
            <p>Bid: {b.amount}</p>
          </div>
          <button
            className="button small"
            onClick={() => handleBidAccept(b.id, "contract_dedo")}
          >
            Accept Bid
          </button>
        </div>
      ))}
      <hr />

      <h2>Tender Plan</h2>

      <div className="full_image">
        <img src={tender?.plan_uri} />
      </div>

      <hr />

      <h2>Milestones</h2>
      <div className="milestones">
        {data.milestones.map((m, index) => (
          <div className="milestone">
            <div className="index">{index + 1}.</div>
            <div className="name">{m.name}</div>
            <div className="check">check</div>
          </div>
        ))}
      </div>
    </div>
  );
}
