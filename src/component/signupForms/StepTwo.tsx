import { AxiosResponse } from "axios";
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
      <span className="label"> Name of SHG </span>
      <input
        name="nameSHG"
        placeholder={nameSHG}
        ref={register({ required: false })}
      />

      <span className="label"> Prodcution Capacity </span>
      <input
        name="productionCap"
        placeholder={productionCap}
        ref={register({ required: false })}
      />

      <span className="label"> Order Size </span>
      <input
        name="orderSize"
        placeholder={orderSize}
        ref={register({ required: false })}
      />

      <span className="label"> Contact Number (WhatsApp) </span>
      <input
        name="contact"
        placeholder={contact}
        ref={register({ required: false })}
      />

      <span className="label"> Industry Type </span>
      {
        <select name="industryType" ref={register({ required: false })}>
          {industryType.split(",").map((type) => (
            <option> {type} </option>
          ))}
        </select>
      }

      <div className="signup-btns">
        <input type="submit" value="Next" />
        <span> Steps: {currentStep}/4</span>
      </div>
    </form>
  );
}
