import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/Auth";

interface Props {
  members: string;
  memberName: string;
  memberContact: string;
  memberAadhar: string;
  skill: string;
  type: string;
  currentStep: number;

  handleNextSubmit: (e: any) => void;
}

export default function StepThree({
  members,
  memberName,
  memberAadhar,
  memberContact,
  skill,
  type,
  currentStep,
  handleNextSubmit,
}: Props) {
  let auth = useAuth();
  const [isRegistrered, setIsRegistered] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (currentStep != 3) return null;
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
      <span className="label"> Members </span>
      <input
        name="members"
        placeholder={members}
        ref={register({ required: false })}
      />

      <span className="label"> Member Name </span>
      <input
        name="member_name"
        placeholder={memberName}
        ref={register({ required: false })}
      />

      <span className="label"> Member Aadhar </span>
      <input
        name="member_aadhar"
        placeholder={memberAadhar}
        ref={register({ required: false })}
      />

      <span className="label"> Contact Number </span>
      <input
        name="member_contact"
        placeholder={memberContact}
        ref={register({ required: false })}
      />

      <span className="label"> Skill </span>
      {
        <select name="skill">
          {skill.split(",").map((type) => (
            <option> {type} </option>
          ))}
        </select>
      }

      <input type="submit" value="Add Member" />
      <div className="signup-btns">
        <input type="submit" value="Next" />
        <span> Steps: {currentStep}/3</span>
      </div>
    </form>
  );
}
