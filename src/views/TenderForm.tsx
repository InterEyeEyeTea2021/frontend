import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function TenderForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = (data: any) => {
    setIsLoading(true);
    console.log("Submitted Form Data: ", data);
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
    <div className="authform">
      <h1>Create Tender</h1>
      <div className="form">
        <h2>Tender Details</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="order_name">Order Name</label>
          <input
            name="order_name"
            id="order_name"
            placeholder="Order Name"
            ref={register({
              required: true,
            })}
          />

          <label htmlFor="industry_type">Industry Type</label>
          <input
            name="industry_type"
            id="industry_type"
            placeholder="Industry Type"
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

          <label htmlFor="skills_req">Skills Required</label>
          <input
            name="skills_req"
            id="skills_req"
            placeholder="Skills Required"
            ref={register({
              required: true,
            })}
          />

          <label htmlFor="location">Location</label>
          <input
            name="location"
            id="location"
            placeholder="Location"
            ref={register({
              required: true,
            })}
          />

          <label htmlFor="media">Attach Media</label>
          <input
            type="file"
            accept=" text/csv"
            id="media"
            style={{
              maxWidth: 300,
            }}
            // onChange={}
          />

          <hr />

          <h2>Payments</h2>

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
              required: false,
            })}
          />

          <hr />

          <h2>Milestones</h2>

          <ol
            style={{
              maxWidth: 200,
            }}
          >
            {milestones.map((m, index) => (
              <li>
                <input
                  name={"milestone" + index}
                  id={"milestone" + index}
                  placeholder={m.name}
                  ref={register({
                    required: false,
                  })}
                />
              </li>
            ))}
          </ol>
          <button className="button">Add Milestone</button>

          <input type="submit" value="Create Tender" disabled={isLoading} />
          <input type="submit" value="Invite SHGs" disabled={isLoading} />
          <div className="error">{message}</div>
        </form>
      </div>
    </div>
  );
}
