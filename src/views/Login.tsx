import { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useAuth, loginForm } from "../hooks/Auth";
import { EMAIL_VALIDATOR } from "../constants/constants";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  let auth = useAuth();
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = (data: loginForm) => {
    setIsLoading(true);
    console.log("Submitted Form Data: ", data);

    auth?.login(
      data,
      () => {
        setIsLoading(false);
        // console.log("login succex");
        history.push("/dashboard");
      },
      (e: AxiosError) => {
        setIsLoading(false);
        // console.log("Error", e);
        if (e.response?.status === 401) {
          setMessage("Email ID / Password are wrong.");
        } else if (e.response?.status === 404) {
          setMessage("Email not found, please register.");
        } else {
          setMessage("An internal error happened, try again later.");
        }
      }
    );
  };

  return (
    <div className="authform login">
      <div className="form">
        <h1>Login</h1>
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
          {errors.email?.type === "required" && <p>This field is required</p>}
          {errors.email?.type === "pattern" && <p> email only</p>}

          <input
            name="password"
            placeholder="Password"
            type="password"
            ref={register({ required: true })}
          />
          {errors.password && <p>This field is required</p>}

          <input type="submit" value="Login" disabled={isLoading} />
        </form>
      </div>
    </div>
  );
}

// Register.propTypes = {};

export default Login;
