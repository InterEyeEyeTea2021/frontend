import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useAuth, registerForm_SHG, registerForm_SME } from "../hooks/Auth";
import StepOne from "../component/signupForms/StepOne";
import { stat } from "node:fs";
import { useForm } from "react-hook-form";
import StepTwo from "../component/signupForms/StepTwo";
import StepThree from "../component/signupForms/StepThree";
import Step2 from "../component/signupForms/Step2";
import Step3 from "../component/signupForms/Step3";
import { useHistory } from "react-router";
import toast from "react-hot-toast";
import { API_IMGBB } from "../constants/constants";
import * as Icon from "react-feather";

function Register() {
  let auth = useAuth();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");

  const [step, setStep] = useState(1);
  let history = useHistory();
  const [state, setState] = useState({
    // non user specific
    name: "Name",
    username: "Username",
    password: "Password",
    profile_image_uri: "",
    media: "",
    phone: "+91 XXXX XX XXXX",
    WAcontact: "+91 XXXX XX XXXX", // for WhatsApp
    user_type: "SHG",
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

  const onSubmit = () => {
    setIsLoading(true);

    if (state.media.length > 0) {
      const e = state.media[0];
      const d = new FormData();
      let photograph;
      console.log(e);
      d.append("image", e);
      axios
        .post("https://api.imgbb.com/1/upload?key=" + API_IMGBB, d)
        .then((resp) => {
          photograph = resp.data.data.image.url;
          console.log(photograph);

          state.profile_image_uri = photograph;

          if (state.user_type === "SHG") {
            const { address, product_sold, ...data } = state;
            console.log(data);

            auth?.registerSHG(data, (response: AxiosResponse) => {
              // console.log("registration succex");
              setIsLoading(false);

              if (response.status === 200) {
                toast.success("Successfully registered, Please login");

                history.push("/login");
              } else {
                setMessage("An error occured, try again later.");
              }
            });
          } else {
            const {
              name_SHG,
              production_cap,
              order_size,
              members,
              member_name,
              member_aadhar,
              member_contact,
              skill,
              ...data
            } = state;

            console.log(data);

            auth?.registerSME(data, (response: AxiosResponse) => {
              // console.log("registration succex");
              setIsLoading(false);

              toast.success("Successfully registered, Please login");

              history.push("/login");

              if (response === undefined || response.status === 500)
                setMessage("Server is down, please try again later");
              else if (response.status === 200) setIsRegistered(true);
              else setMessage(response.data.message);
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  const handleNextSubmit = (
    data: Partial<{
      name: string;
      username: string;
      password: string;
      phone: string;
      WAcontact: string;
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
      user_type: type,
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
          {step > 1 ? <p>{state.user_type}</p> : null}
        </div>
        <div className="error">{message}</div>
        <StepOne
          name={state.name}
          username={state.username}
          password={state.password}
          phone={state.phone}
          type={state.user_type}
          currentStep={step}
          handleNextSubmit={handleNextSubmit}
          handleTypeChange={handleTypeChange}
        />

        {state.user_type === "SHG" ? (
          <>
            <StepTwo
              nameSHG={state.name_SHG}
              media={state.media}
              productionCap={state.production_cap}
              orderSize={state.order_size}
              contact={state.WAcontact}
              industryType={state.industry_type}
              type={state.user_type}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />

            <Step3
              accountNumber={state.account_number}
              branchCode={state.branch_code}
              type={state.user_type}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />
          </>
        ) : (
          ""
        )}

        {state.user_type === "SME" ? (
          <>
            <Step2
              address={state.address}
              media={state.media}
              productSold={state.product_sold}
              contact={state.WAcontact}
              industryType={state.industry_type}
              type={state.user_type}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />

            <Step3
              accountNumber={state.account_number}
              branchCode={state.branch_code}
              type={state.user_type}
              currentStep={step}
              handleNextSubmit={handleNextSubmit}
            />
          </>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="buttons">
            {step > 1 && step < 4 ? (
              <input
                type="button"
                className="back"
                value="Back"
                onClick={handleBack}
              />
            ) : (
              ""
            )}

            {step === 4 ? (
              <>
                <h3> Your details won't be shared to any third party. </h3>
                {/* <span className="label"> OTP </span>
                <input
                  name="otp"
                  placeholder="OTP"
                  ref={register({ required: false })}
                /> */}

                <button type="submit" disabled={isLoading}>
                  {isLoading ? <Icon.Loader className="loader" /> : "Accept"}
                </button>
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
