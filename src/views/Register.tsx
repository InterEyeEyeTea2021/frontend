import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth, registerForm } from "../hooks/Auth";
import { EMAIL_VALIDATOR } from "../constants/constants";

function Register() {
  let auth = useAuth();
  const [isRegistrered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data: registerForm) => {
    setIsLoading(true);
    // console.log("Submitted Form Data: ", data);

    auth?.register(data, (response: AxiosResponse) => {
      // console.log("registration succex");
      setIsLoading(false);

      if (response === undefined || response.status === 500)
        setMessage("Server is down, please try again later");
      else if (response.status === 200) setIsRegistered(true);
      else setMessage(response.data.message);
    });
  };

  return (
    <div className="authform register">
      <div className="form">
        {isRegistrered ? (
          <h1> Verfication link sent to email </h1>
        ) : (
          <>
            <h1>Register</h1>
            <div className="error">{message}</div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                name="email"
                placeholder="Email"
                ref={register({
                  required: true,
                  pattern: EMAIL_VALIDATOR,
                })}
              />
              {errors.email?.type === "required" && (
                <p>This field is required</p>
              )}
              {errors.email?.type === "pattern" && <p>IITKGP email-id only</p>}

              <input type="submit" value="Signup" disabled={isLoading} />
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// Register.propTypes = {};

export default Register;
