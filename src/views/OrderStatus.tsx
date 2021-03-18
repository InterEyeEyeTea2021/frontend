import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Icon from "react-feather";
import TitleHeader from "../component/TitleHeader";
import { Link, useHistory, useParams } from "react-router-dom";
import { SHGUser, SMEUser, useAuth } from "../hooks/Auth";
import axios from "axios";
import { BACKEND_URL } from "../constants/constants";
import Modal from "react-modal";
import toast from "react-hot-toast";

interface OrderData {
  contract: string;
  description: string;
  milestones: [];
  order_id: number;
  shg_id: number;
  sme_id: number;
  state: string;
}

Modal.setAppElement("#root");

export default function OrderStatus() {
  const { register, handleSubmit, errors } = useForm();
  const auth = useAuth();
  let urlParams: { id: string } = useParams();
  const is_sme = auth?.user && auth.user.user_type === "SME";
  const [confirmCompleteOpen, setConfirmCompleteOpen] = useState(false);

  const history = useHistory();

  const user_url_param = is_sme ? "sme" : "shg";

  const [orderData, setOrderData] = useState<OrderData>();

  let id: any;
  if (!is_sme) {
    id = (auth?.user as SHGUser)?.shg_id || (auth?.user as SMEUser)?.sme_id;
    console.log(auth?.user);
  } else {
  }

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/order/${user_url_param}?id=${urlParams.id}`)
      .then((res) => {
        console.log(res.data, "order");
        let order: OrderData = res.data.filter((o: OrderData) => {
          return o.order_id == Number(urlParams.id);
        })[0];
        if (order) {
          setOrderData(order);
          console.log(order);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeCompleteModal = () => {
    setConfirmCompleteOpen(false);
  };

  const completeOrder = (e: React.MouseEvent) => {
    axios
      .get(`${BACKEND_URL}/order/completeOrder?id=${urlParams.id}`)
      .then(() => {
        let newMilestones = milestones.map((m) => {
          return {
            ...m,
            status: true,
          };
        });
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

  const data = {
    order_name: "Order Name",
    industry_type: "Agriculture",
    description: "Description",
    skills_req: "Skills Required",
    location: "Location",
    payments: [
      {
        amount: 2000,
        name: "Machinery",
        status: "pending",
      },
      {
        amount: 5000,
        name: "Machinery",
        status: "paid",
      },
      {
        amount: 2000,
        name: "Machinery",
        status: "paid",
      },
    ],
    milestones: [
      { id: 1, name: "Milestone 1", status: true },
      { id: 2, name: "Milestone 2", status: true },
      { id: 3, name: "Milestone 3", status: false },
      { id: 4, name: "Milestone 4", status: false },
    ],
  };

  const [milestones, setMilestones] = useState([
    { id: 1, name: "Acquire Materials", status: false },
    { id: 2, name: "Start Production", status: false },
    { id: 3, name: "Finish Production", status: false },
    { id: 4, name: "Ship the Product", status: false },
  ]);

  const updateMilestone = (id: number) => {
    let m = milestones.filter((m) => m.id === id)[0];
    let newMilestones = milestones.map((m) => {
      if (m.id == id) {
        return {
          ...m,
          status: !m.status,
        };
      }
      return m;
    });
    let completed = 0;
    newMilestones.forEach((m) => {
      if (m.status) {
        completed++;
      }
    });
    if (completed === milestones.length) {
      setConfirmCompleteOpen(true);
    } else {
      if (m.status) {
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
      setMilestones(newMilestones);
    }
  };

  return (
    <div className="main_content">
      <TitleHeader
        title="Order Status"
        user_type={auth?.user?.user_type as string}
      />
      <h1>
        Order <span className="tag">{orderData?.state}</span>
      </h1>
      {/* <div className="detail">
        <div className="label">Tender Name</div>
        <div className="value">{data.order_name}</div>
      </div> */}
      <div className="detail">
        <div className="label">Industry Type</div>
        <div className="value">{data.industry_type}</div>
      </div>

      <div className="detail">
        <div className="label">Description</div>
        <div className="value">{orderData?.description}</div>
      </div>

      <div className="detail">
        <div className="label">Order Contract</div>
        <a href={orderData?.contract} className="no_style">
          <div className="value">{orderData?.contract}</div>
        </a>
      </div>

      {/* <div className="detail">
        <div className="label">Location</div>
        <div className="value">{data.location}</div>
      </div> */}

      <hr />

      {auth?.user?.user_type === "SME" ? (
        <div className="call_box">
          <img src="https://i.imgur.com/khUO2T7.png" alt="" />
          <div className="details">
            <h1>SHG NAME</h1>
            <p>XXXX XX XXXX</p>
          </div>
          <div className="call">
            <Icon.PhoneCall></Icon.PhoneCall>
          </div>
        </div>
      ) : (
        <div className="call_box">
          <img src="https://i.imgur.com/khUO2T7.png" alt="" />
          <div className="details">
            <h1>SME NAME</h1>
            <p>XXXX XX XXXX</p>
          </div>
          <div className="call">
            <Icon.PhoneCall></Icon.PhoneCall>
          </div>
        </div>
      )}

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
        {milestones.map((m, index) => (
          <div className="milestone">
            <div className="index">{index + 1}.</div>
            <div className="name">{m.name}</div>
            <div className="check">
              <input
                type="checkbox"
                name={m.name}
                id={"mile_check" + m.name}
                checked={m.status}
                onClick={(e) => {
                  if (!is_sme) {
                    updateMilestone(m.id);
                  }
                }}
              />
              <span className="checkbox__control">
                <Icon.Check></Icon.Check>
              </span>
            </div>
          </div>
        ))}
      </div>

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
        <button onClick={completeOrder}>Complete Order</button>
        <button onClick={closeCompleteModal} className="default">
          Cancel
        </button>
      </Modal>

      <hr />
    </div>
  );
}
