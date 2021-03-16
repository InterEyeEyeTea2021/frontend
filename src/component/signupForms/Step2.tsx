import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/Auth";

interface Props {
  address: string;
  productSold: string;
  contact: string;
  industryType: string;
  type: string;
  currentStep: number;

  handleNextSubmit: (e: any) => void;
}

export default function Step2({
  address,
  productSold,
  contact,
  industryType,
  type,
  currentStep,
  handleNextSubmit,
}: Props) {
  let auth = useAuth();
  const { register, handleSubmit, errors } = useForm();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (currentStep != 2) return null;
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
      <span className="label"> Address </span>
      <input
        name="address"
        placeholder={address}
        ref={register({ required: true })}
      />

      <span className="label"> Product Sold </span>
      <input
        name="product_sold"
        placeholder={productSold}
        ref={register({ required: true })}
      />

      <span className="label"> Contact Number (WhatsApp) </span>
      <input
        name="WAcontact"
        placeholder={contact}
        ref={register({ required: true })}
      />

      <span className="label"> Industry Type </span>
      {
        <select name="industry_type" ref={register({ required: false })}>
          {industryType.split(",").map((type) => (
            <option> {type} </option>
          ))}
        </select>
      }

      <div className="signup-btns">
        <input type="submit" value="Next" />
        <span> Steps: {currentStep}/3</span>
      </div>
    </form>
  );
}
