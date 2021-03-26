import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import TitleHeader from "../component/TitleHeader";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { API_YOUTUBE, BACKEND_URL } from "../constants/constants";
import { SHGUser, useAuth } from "../hooks/Auth";
import { Bid, Tender, Milestone, Video } from "../types";
import toast from "react-hot-toast";
import Modal from "react-modal";

export default function BidStatus() {
  const { register, handleSubmit, errors } = useForm();
  const [tender, setTender] = useState<Tender>();
  const [confirmCompleteOpen, setConfirmCompleteOpen] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<Milestone>();
  const [video, setVideo] = useState<Video>();
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
  };
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      name: "Acquire Materials",
      description: "this is a milestone",
      status: "pending",
      media: [],
    },
    {
      id: 2,
      name: "Start Production",
      description: "this is a milestone",
      status: "pending",
      media: [],
    },
    {
      id: 3,
      name: "Finish Production",
      description: "this is a milestone",
      status: "pending",
      media: [],
    },
    {
      id: 4,
      name: "Ship the Product",
      description: "this is a milestone",
      status: "pending",
      media: [],
    },
  ]);

  const openCompleteModal = (m: Milestone) => {
    setConfirmCompleteOpen(true);
    setCurrentMilestone(m);
  };

  const closeCompleteModal = () => {
    setConfirmCompleteOpen(false);
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

        axios
          .get(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&type=video&q=handmade%20${res.data.data.name}&key=${API_YOUTUBE}`
          )
          .then((res) => {
            console.log(res.data, "video");
            setVideo(res.data.items[0].id);
          })
          .catch((err) => {
            console.log(err);
          });
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
        <img src="https://i.imgur.com/0AJf1LN.png" alt="" />
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

      <div className="detail description">
        <div className="label">Description</div>
        <div className="value">{tender?.description}</div>
      </div>

      <hr />

      <h2>Tender Plan</h2>

      <div className="full_image">
        <img src={tender?.plan_uri} />
      </div>

      <hr />

      <h2>Milestones</h2>

      <div className="milestones">
        {milestones.map((m, index) => (
          <div className="milestone" onClick={(e) => openCompleteModal(m)}>
            <div className="upper-body">
              <div className="index">{index + 1}.</div>
              <div className="name">{m.name}</div>
            </div>
            {/* <div className="check">check</div> */}
          </div>
        ))}
      </div>

      <hr />

      <div>
        <h3> Skills Tutorial </h3>
        <iframe
          src={`https://www.youtube.com/embed/${video?.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
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

      <Modal
        isOpen={confirmCompleteOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeCompleteModal}
        // style={customStyles}
        contentLabel="Confirm Complete Modal"
      >
        <h1>{currentMilestone?.name}</h1>
        <p>{currentMilestone?.description}</p>
        <div className="full_image">
          <img src={currentMilestone?.media[0]?.uri} alt="" />
        </div>

        <button onClick={closeCompleteModal} className="default">
          Close
        </button>
      </Modal>
    </div>
  );
}
