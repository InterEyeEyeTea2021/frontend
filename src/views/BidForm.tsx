import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import TitleHeader from "../component/TitleHeader";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import { useHistory, useParams } from "react-router";
import toast from "react-hot-toast";
import { authContext, SHGUser, useAuth } from "../hooks/Auth";
import { Bid, Milestone } from "../types";
import Modal from "react-modal";

interface Tender {
  id: number;
  name: string;
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
    profile_image_uri: string;
    phone: string;
  };
  bids: {
    amount: string;
    shg_id: number;
    tender_id: number;
  }[];
}

export default function BidForm() {
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [tender, setTender] = useState<Tender>();
  const [confirmCompleteOpen, setConfirmCompleteOpen] = useState(false);
  const [currentMilestone, setCurrentMilestone] = useState<Milestone>();

  let history = useHistory();
  let { id }: { id: string } = useParams();
  const auth = useAuth();
  let shg_id = (auth?.user as SHGUser).shg_id;

  const data = {
    tender_name: "Tender Name",
    industry_type: "Agriculture",
    description: "Description",
    skills_req: "Skills Required",
    location: "Location",
    quanity: 100,
    payments: [
      {
        keyname: "completion",
        pay_name: "Total Value",
        suggested_value: 2000,
      },
      {
        keyname: "advanced",
        pay_name: "Advanced(Min 10%)",
        suggested_value: 200,
      },
    ],
  };

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      name: "Acquire Materials",
      description: "Acquire Cloth and Needles",
      status: false,
      media: [],
    },
    {
      id: 2,
      name: "Start Production",
      description: "Start producing the saree",
      status: false,
      media: [],
    },
    {
      id: 3,
      name: "Finish Production",
      description: "Finish production of all saree",
      status: false,
      media: [],
    },
    {
      id: 4,
      name: "Ship the Product",
      description: "Ship on the determined address",
      status: false,
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

  const onSubmit = (data: {
    paymentcompletion: string;
    paymentadvanced: string;
  }) => {
    setIsLoading(true);
    console.log(data);
    // Put the toast inside the API Call
    axios
      .post(`${BACKEND_URL}/bid/create`, {
        shg_id: shg_id,
        amount: data.paymentcompletion,
        tender_id: id,
      })
      .then((res) => {
        setIsLoading(false);
        console.log(res.data);
        toast.success("Bid created!");

        window.setTimeout(
          () => toast.success("Redirecting to Dashboard"),
          3000
        );
        window.setTimeout(() => history.push("/dashboard"), 5000);
      });
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
        let bids = res.data.data.bids.filter((b: Bid) => {
          return b.shg_id === (auth?.user as SHGUser).shg_id;
        });

        if (bids.length > 0) {
          window.setTimeout(
            () => toast.success("Bid exists, Showing bid!"),
            1000
          );
          window.setTimeout(
            () => history.push("/bid/" + res.data.data.id),
            3000
          );
        }
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
        <img src={tender?.media[0]?.uri} alt="" />
      </div>
      <div className="sme-details call_box">
        <div className="image">
          <img src="https://i.imgur.com/0AJf1LN.png" alt="" />
        </div>
        <div className="details">
          <h1>{tender?.sme.name}</h1>
          {/* <p>{tender?.sme.phone}</p> */}
        </div>
      </div>

      <h2>Tender Details</h2>
      <div className="detail">
        <div className="label">Tender Name</div>
        <div className="value">{tender?.name}</div>
      </div>

      <div className="detail">
        <div className="label">Quantity</div>
        <div className="value">{data.quanity}</div>
      </div>

      <div className="detail description">
        <div className="label">Description</div>
        <div className="value">{tender?.description}</div>
      </div>

      {/* <div className="detail">
        <div className="label">Skills Required</div>
        <div className="value">{data.skills_req}</div>
      </div> */}

      {/* <div className="detail">
        <div className="label">Location</div>
        <div className="value">{data.location}</div>
      </div> */}

      <hr />

      <h2>Milestones</h2>

      <div className="milestones">
        {milestones.map((m, index) => (
          <div className="milestone" onClick={(e) => openCompleteModal(m)}>
            <div className="upper-body">
              <div className="index">&bull;</div>
              <div className="name">{m.name}</div>
            </div>
            <p className="description">{m.description}</p>
            {/* <div className="check">check</div> */}
          </div>
        ))}
      </div>

      <hr />

      <h2>Payment Breakup</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {data.payments.map((p, i) => (
          <div className="payment_details">
            <div className="detail">
              <div className="label">{p.pay_name} (Suggested by SME)</div>
              <div className="value">
                {p.suggested_value ? p.suggested_value : "Nil"}
              </div>
            </div>
          </div>
        ))}

        {data.payments.map((p, i) => (
          <div>
            <label htmlFor={"payment" + p.keyname}>{p.pay_name}</label>
            <input
              name={"payment" + p.keyname}
              id={"payment" + p.keyname}
              placeholder="Price"
              ref={register({
                required: false,
              })}
            />
          </div>
        ))}

        <button type="submit" disabled={isLoading}>
          {isLoading ? <Icon.Loader className="loader" /> : "Bid for Order"}
        </button>
      </form>

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
