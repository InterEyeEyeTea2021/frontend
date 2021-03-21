import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/Auth";

interface Props {
  name: string;
  username: string;
  password: string;
  phone: string;
  type: string;
  currentStep: number;

  handleNextSubmit: (e: any) => void;
  handleTypeChange: (s: string) => void;
}

export default function StepOne({
  name,
  username,
  password,
  phone,
  type,
  currentStep,
  handleNextSubmit,
  handleTypeChange,
}: Props) {
  let auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (currentStep != 1) return null;
  // const onSubmit = (data: registerForm) => {
  //   setIsLoading(true);
  //   // console.log("Submitted Form Data: ", data);

  //   auth?.register(data, (response: AxiosResponse) => {
  //     // console.log("registration succex");
  //     setIsLoading(false);

  //     if (response === undefined || response.status === 500)
  //       setMessage('Server is down, please try again later');
  //     else if (response.status === 200) setIsRegistered(true);
  //     else setMessage(response.data.message);
  //   });
  // };

  return (
    <form onSubmit={handleSubmit(handleNextSubmit)}>
      <span className="label"> Name </span>
      <input
        name="name"
        placeholder={name}
        ref={register({ required: true })}
      />

      <span className="label"> Username </span>
      <input
        name="username"
        placeholder={username}
        ref={register({ required: true })}
      />

      <span className="label"> Password </span>
      <input
        name="password"
        type="password"
        placeholder={password}
        ref={register({ required: true })}
      />

      <span className="label"> Phone Number </span>
      <input
        name="phone"
        placeholder={phone}
        ref={register({ required: true })}
      />

      <span className="label"> Type of User </span>
      <div className="types">
        <div
          className={`type ${type == "SHG" && "current"}`}
          onClick={() => handleTypeChange("SHG")}
        >
          Producer
        </div>
        <div
          className={`type ${type == "SME" && "current"}`}
          onClick={() => handleTypeChange("SME")}
        >
          Buyer
        </div>
      </div>
      {/* <input
        name='type'
        placeholder={type}
        ref={register({ required: false })}
      /> */}

      <div className="signup-btns">
        <input type="submit" value="Next" />
        <span>Steps: {`${currentStep}/3`}</span>
      </div>
    </form>
  );
}
