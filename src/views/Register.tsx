import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useAuth, registerForm } from "../hooks/Auth";
import StepOne from "../component/signupForms/StepOne";
import { stat } from "node:fs";
import { useForm } from "react-hook-form";
import StepTwo from "../component/signupForms/StepTwo";
import StepThree from "../component/signupForms/StepThree";
import Step2 from "../component/signupForms/Step2";
import Step3 from "../component/signupForms/Step3";

function Register() {
  let auth = useAuth();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");

  const [state, setState] = useState({
    // non user specific
    name: "Name",
    username: "Username",
    phone: "+91 XXXX XX XXXX",
    contact: "+91 XXXX XX XXXX", // for WhatsApp
    type: "SHG",
    industry_type: "Agriculture, Something, Engineering",
    account_number: "Account Number",
    branch_code: "IFSC Code",

    // for SHGs only
    name_SHG: "Name of SHG",
    production_cap: "Production Capacity",
    order_size: "Order Size",
    members: "No members added yet",
    member_name: "Name",
    member_aadhar: "Aadhar",
    member_contact: "+91 XXXX XX XXXX",
    skill: "Agriculture, Something, Engineering",

    // for SMEs only
    address: "Address",
    product_sold: "Products Sold",
  });

  const [step, setStep] = useState(1);

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

  const handleNextSubmit = (
    data: Partial<{
      name: string;
      username: string;
      phone: string;
      contact: string;
      type: string;
      industry_type: string;
      account_number: string;
      branch_code: string;

      name_SHG: string;
      production_cap: string;
      member_name: string;
      member_contact: string;
      member_aadhar: string;
      skill: string;

      address: string;
      product_sold: string;
    }>
  ) => {
    setState({
      ...state,
      ...data,
    });

    handleNext();
  };

  const handleTypeChange = (type: string) => {
    setState({
      ...state,
      type,
    });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  return (
    <div className="authform main_content register">
      <div className="form">
        <div className="title">
          <h1>Signup</h1>
          {step > 1 ? <p>{state.type}</p> : null}
        </div>
        <div className="error">{message}</div>
        <StepOne
          name={state.name}
          username={state.username}
          phone={state.phone}
          type={state.type}
          currentStep={step}
          handleNextSubmit={handleNextSubmit}
          handleTypeChange={handleTypeChange}
        />

        {state.type === "SHG" ? (
          <>
            <StepTwo
              nameSHG={state.name_SHG}
              productionCap={state.production_cap}
              orderSize={state.order_size}
              contact={state.contact}
              industryType={state.industry_type}
              type={state.type}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />

            <StepThree
              members={state.members}
              memberName={state.member_name}
              memberAadhar={state.member_aadhar}
              memberContact={state.member_contact}
              skill={state.skill}
              type={state.type}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />

            <Step3
              accountNumber={state.account_number}
              branchCode={state.branch_code}
              type={state.type}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />
          </>
        ) : (
          ""
        )}

        {state.type === "SME" ? (
          <>
            <Step2
              address={state.address}
              productSold={state.product_sold}
              contact={state.contact}
              industryType={state.industry_type}
              type={state.type}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />

            <Step3
              accountNumber={state.account_number}
              branchCode={state.branch_code}
              type={state.type}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />
          </>
        ) : (
          ""
        )}
        <form>
          <div className="buttons">
            {(state.type === "SME" && step > 1 && step < 4) ||
            (state.type === "SHG" && step > 1 && step < 5) ? (
              <input
                type="button"
                className="back"
                value="Back"
                onClick={handleBack}
              />
            ) : (
              ""
            )}

            {(state.type === "SME" && step === 4) ||
            (state.type === "SHG" && step === 5) ? (
              <>
                <h3> Verify the OTP sent to your mobile number </h3>
                <span className="label"> OTP </span>
                <input
                  name="otp"
                  placeholder="OTP"
                  ref={register({ required: true })}
                />

                <input type="submit" value="Verify" onClick={handleNext} />
              </>
            ) : (
              ""
            )}
          </div>
        </form>

        <hr />
        <span>If you have an account, please </span>
        <a className="button back" href="/login" rel="noreferrer noopener">
          Login
        </a>
      </div>
    </div>
  );
}

export default Register;
