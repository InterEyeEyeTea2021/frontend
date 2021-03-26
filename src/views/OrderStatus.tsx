import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import TitleHeader from "../component/TitleHeader";
import { Link, useHistory, useParams } from "react-router-dom";
import { SHGUser, SMEUser, useAuth } from "../hooks/Auth";
import axios from "axios";
import { API_YOUTUBE, BACKEND_URL } from "../constants/constants";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { Milestone, Video } from "../types";

interface OrderData {
  order_id: number;
  state: string;
  plan_uri: string;
  description: string;
  contract: string;
  order_name: string;
  name_SHG: string;
  completion: string;

  media: {
    uri: string;
    type: string;
  }[];

  sme: {
    id: number;
    name: string;
    phone: string;
    profile_image_uri: string;
  };

  shg: {
    id: number;
    name: string;
    phone: string;
    profile_image_uri: string;
  };

  milestones: Milestone[];
}

Modal.setAppElement("#root");

export default function OrderStatus() {
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [video, setVideo] = useState<Video>();
  const [milestones, setMilestones] = useState<Milestone[]>();
  const auth = useAuth();
  let urlParams: { id: string } = useParams();
  const is_sme = auth?.user && auth.user.user_type === "SME";
  const [currentMilestone, setCurrentMilestone] = useState<Milestone>({
    id: 1,
    name: "Acquire Materials",
    description: "this is a milestone",
    status: "pending",
    media: [
      {
        type: "image",
        uri: "",
      },
    ],
  });
  const [confirmMilestone, setConfirmMilestone] = useState(false);
  const [confirmCompleteOpen, setConfirmCompleteOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();

  const user_url_param = is_sme ? "sme" : "shg";

  const [orderData, setOrderData] = useState<OrderData>();

  let id: any;
  id = (auth?.user as SHGUser)?.shg_id || (auth?.user as SMEUser)?.sme_id;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/order/${user_url_param}?id=${id}`)
      .then((res) => {
        console.log(res.data, "order");
        let order: OrderData = res.data.filter((o: OrderData) => {
          return o.order_id == Number(urlParams.id);
        })[0];
        if (order) {
          setOrderData(order);
          setMilestones(order.milestones);
          console.log(order, "this order");

          axios
            .get(
              `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&type=video&q=handmade%20${order.order_name}&key=${API_YOUTUBE}`
            )
            .then((res) => {
              console.log(res.data, "video");
              setVideo(res.data.items[0].id);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeCompleteModal = () => {
    orderData?.state == "completed"
      ? setOpenModal(false)
      : setConfirmCompleteOpen(false);
  };

  const openModalSME = (id: number) => {
    if (orderData?.state == "completed") {
      setOpenModal(true);
      let m = milestones!.filter((m) => m.id === id)[0];
      setCurrentMilestone(m);
    }
  };

  const completeOrder = (e: React.MouseEvent) => {
    setIsLoading(true);
    axios
      .get(`${BACKEND_URL}/order/completeOrder?id=${urlParams.id}`)
      .then(() => {
        let newMilestones = milestones!.map((m) => {
          return {
            ...m,
            status: "completed",
          };
        });
        setIsLoading(false);
        toast.success("Order Completed Successfully!");
        setMilestones(newMilestones);
        setConfirmCompleteOpen(false);

        window.setTimeout(
          () => toast.success("Redirecting to Dashboard"),
          3000
        );
        window.setTimeout(() => history.push("/dashboard"), 5000);
      })
      .catch((e) => console.log(e));
  };

  const openMilestone = (id: number) => {
    if (orderData?.state == "completed") return;
    let m = milestones!.filter((m) => m.id === id)[0];
    setCurrentMilestone(m);
    let newMilestones = milestones!.map((m) => {
      if (m.id == id) {
        return {
          ...m,
          status: m.status == "pending" ? "completed" : "pending",
        };
      }
      return m;
    });
    let completed = 0;
    newMilestones.forEach((m) => {
      if (m.status == "completed") {
        completed++;
      }
    });
    if (completed === milestones!.length) {
      setConfirmCompleteOpen(true);
    } else {
      setConfirmMilestone(true);
    }
  };

  const closeCurrentMilestone = () => {
    setConfirmMilestone(false);
    setOpenModal(false);
  };

  const updateMilestone = (id: number) => {
    let m = milestones!.filter((m) => m.id === id)[0];
    let newMilestones = milestones!.map((m) => {
      if (m.id == id) {
        console.log(m.status);
        return {
          ...m,
          status: m.status == "pending" ? "completed" : "pending",
        };
      }
      return m;
    });
    if (m.status == "completed") {
      toast((t) => (
        <div className="toast_with_icon">
          <Icon.Info></Icon.Info>
          {m.name + " marked as todo!"}
        </div>
      ));
    } else {
      toast.success(m.name + " marked as complete!");
    }
    // history.push("/dashboard");
    setConfirmMilestone(false);
    setMilestones(newMilestones);
  };

  return (
    <div className="main_content">
      <TitleHeader
        title="Order Status"
        user_type={auth?.user?.user_type as string}
      />
      <div className="full_image">
        <img src={orderData?.media[0].uri} alt="" />
      </div>
      <h1>
        Order <span className="tag">{orderData?.state}</span>
      </h1>
      {/* <div className="detail">
        <div className="label">Tender Name</div>
        <div className="value">{data.order_name}</div>
      </div> */}
      {/* <div className="detail">
        <div className="label">Industry Type</div>
        <div className="value">{data.industry_type}</div>
      </div> */}

      <div className="detail description">
        <div className="label">Description</div>
        <div className="value">{orderData?.description}</div>
      </div>

      {/* <div className="detail">
        <div className="label">Order Contract</div>
        <a href={orderData?.contract} className="no_style">
          <div className="value">{orderData?.contract}</div>
        </a>
      </div> */}

      {/* <div className="detail">
        <div className="label">Location</div>
        <div className="value">{data.location}</div>
      </div> */}

      <hr />

      {auth?.user?.user_type === "SME" ? (
        <div className="call_box">
          <img
            // src={
            //   orderData?.shg.profile_image_uri ??
            //   `http://tinygraphs.com/isogrids/${orderData?.shg.name}?theme=seascape&numcolors=4`
            // }
            src="https://i.imgur.com/0AJf1LN.png"
            alt=""
          />
          <div className="details">
            <h1>{orderData?.shg.name}</h1>
            <p>{orderData?.shg.phone}</p>
          </div>
          <div className="call">
            <Icon.PhoneCall></Icon.PhoneCall>
          </div>
        </div>
      ) : (
        <div className="call_box">
          <img
            // src={
            //   orderData?.sme.profile_image_uri ??
            //   `http://tinygraphs.com/isogrids/${orderData?.sme.name}?theme=seascape&numcolors=4`
            // }
            src="https://i.imgur.com/0AJf1LN.png"
            alt=""
          />
          <div className="details">
            <h1>{orderData?.sme.name}</h1>
            <p>{orderData?.sme.phone}</p>
          </div>
          <div className="call">
            <Icon.PhoneCall></Icon.PhoneCall>
          </div>
        </div>
      )}
      <hr />

      <h2>Tender Plan</h2>

      <div className="full_image">
        <img src={orderData?.plan_uri} />
      </div>

      <hr />

      {/* 
      <h2>Payments</h2>

      {data.payments.map((p, i) => (
        <Link to="/order/1/payment/1" className="no_style">
          <div className="payment">
            <div className="details">
              <h1 className="amount">
                ₹{p.amount}
                <span className="tag">
                  {p.status[0].toUpperCase() + p.status.slice(1)}
                </span>
              </h1>
              <h1>{p.name}</h1>
            </div>
            {is_sme ? (
              <button
                className={"small" + (p.status == "pending" ? "" : " default")}
              >
                {p.status == "pending" ? "Pay" : "Details"}
              </button>
            ) : (
              <button className="small default">Details</button>
            )}
          </div>
        </Link>
      ))} 
      
      <Link className="button" to={"/order/" + urlParams.id + "/payment"}>
        Request Payment
      </Link>
      */}

      <h2>Milestones</h2>

      <div className="milestones">
        {milestones?.map((m, index) => (
          <div className="milestone" onClick={() => openModalSME(m.id)}>
            <div className="upper-body">
              <div className="index">{index + 1}.</div>
              <div className="name">{m.name}</div>
              <div className="check">
                <input
                  type="checkbox"
                  name={m.name}
                  id={"mile_check" + m.name}
                  checked={
                    orderData?.state == "completed" || m.status !== "pending"
                      ? true
                      : false
                  }
                  onClick={(e) => openMilestone(m.id)}
                />
                <span className="checkbox__control">
                  <Icon.Check></Icon.Check>
                </span>
              </div>
            </div>
            <div className="description">{m.description}</div>
          </div>
        ))}
      </div>
      {!is_sme && (
        <Link
          to={`/order/${urlParams.id}/logistics`}
          className="button default"
        >
          Logistics & Delivery
        </Link>
      )}

      {!is_sme && (
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
      )}

      {/* This is for viewing a milestone for sme */}
      <Modal
        isOpen={openModal}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeCompleteModal}
        // style={customStyles}
        contentLabel="Confirm Complete Modal"
      >
        <h1>{currentMilestone?.name}</h1>
        <p>{currentMilestone?.description}</p>
        <img src={currentMilestone?.media[0]?.uri} />

        <button onClick={closeCompleteModal} className="default">
          Close
        </button>
      </Modal>

      {/* This is when all the milestones have been marked complete */}
      <Modal
        isOpen={confirmCompleteOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeCompleteModal}
        // style={customStyles}
        contentLabel="Confirm Complete Modal"
      >
        <h1>Confirm Completed</h1>
        <p>
          You are marking all milestones as complete, do you want to mark the
          order completed?
        </p>
        <p>Canceling will not mark this milestone.</p>
        <button onClick={completeOrder} disabled={isLoading}>
          {isLoading ? <Icon.Loader className="loader" /> : "Complete Order"}
        </button>
        <button onClick={closeCompleteModal} className="default">
          Cancel
        </button>
      </Modal>

      {/* This is for completing a milestone */}
      <Modal
        isOpen={confirmMilestone}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeCompleteModal}
        // style={customStyles}
        contentLabel="Confirm Complete Modal"
      >
        <h1>{currentMilestone?.name}</h1>
        <p>{currentMilestone?.description}</p>
        <label htmlFor="media"> Upload Image </label>
        <input
          type="file"
          accept="image/png, image/jpeg"
          name="media"
          ref={register({ required: false })}
        />
        <p>Canceling will not mark this milestone.</p>
        <button
          onClick={(e) => {
            if (!is_sme && orderData?.state != "completed") {
              updateMilestone(currentMilestone.id);
            }
          }}
          disabled={isLoading}
        >
          {isLoading ? <Icon.Loader className="loader" /> : "Update Milestone"}
        </button>
        <button onClick={closeCurrentMilestone} className="default">
          Cancel
        </button>
      </Modal>
      <hr />
    </div>
  );
}
