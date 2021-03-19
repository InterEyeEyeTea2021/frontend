import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/Auth";

interface Props {
  address: string;
  media: string;
  productSold: string;
  contact: string;
  industryType: string;
  type: string;
  currentStep: number;

  handleNextSubmit: (e: any) => void;
}

export default function Step2({
  address,
  media,
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

      <label htmlFor="media"> Upload Profile Image </label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        name="media"
        ref={register({ required: true })}
      />

      <div className="signup-btns">
        <input type="submit" value="Next" />
        <span> Steps: {currentStep}/3</span>
      </div>
    </form>
  );
}
