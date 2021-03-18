import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/Auth";

interface Props {
  nameSHG: string;
  productionCap: string;
  contact: string;
  type: string;
  orderSize: string;
  industryType: string;
  currentStep: number;

  handleNextSubmit: (e: any) => void;
}

export default function StepTwo({
  nameSHG,
  productionCap,
  orderSize,
  contact,
  type,
  industryType,
  currentStep,
  handleNextSubmit,
}: Props) {
  let auth = useAuth();
  const [isRegistrered, setIsRegistered] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (currentStep != 2) return null;

  return (
    <form onSubmit={handleSubmit(handleNextSubmit)}>
      <span className="label"> Name of SHG </span>
      <input
        name="name_SHG"
        placeholder={nameSHG}
        ref={register({ required: false })}
      />

      <span className="label"> Prodcution Capacity </span>
      <input
        name="production_cap"
        placeholder={productionCap}
        ref={register({ required: false })}
      />

      <span className="label"> Order Size </span>
      <input
        name="order_size"
        placeholder={orderSize}
        ref={register({ required: false })}
      />

      <span className="label"> Contact Number (WhatsApp) </span>
      <input
        name="WAcontact"
        placeholder={contact}
        ref={register({ required: false })}
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
