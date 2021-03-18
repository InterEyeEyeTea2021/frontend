import { AxiosError } from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { useAuth, loginForm } from "../hooks/Auth";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  let auth = useAuth();
  let history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState("");
  const [type, setType] = useState("SHG");

  const onSubmit = (data: loginForm) => {
    data.user_type = type;
    data.remember = "false";
    setIsLoading(true);
    console.log("Submitted Form Data: ", data);

    auth?.login(
      data,
      () => {
        setIsLoading(false);
        // console.log("login succex");
        toast.success("Welcome!");

        history.push("/dashboard");
      },
      (e: AxiosError) => {
        setIsLoading(false);
        // console.log("Error", e);
        if (e.response?.status != 200) {
          setMessage("An error occured, try again later.");
        }
      }
    );
  };

  const handleTypeChange = (e: string) => {
    setType(e);
  };

  return (
    <div className="main_content login">
      <div className="form">
        <h1>Login</h1>
        <div className="error">{message}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="label"> Username </span>
          <input
            name="username"
            placeholder="Username"
            ref={register({ required: true })}
          />
          {errors.username && <p>This field is required</p>}

          <span className="label"> Password </span>
          <input
            name="password"
            placeholder="Password"
            type="password"
            ref={register({ required: true })}
          />
          {errors.password && <p>This field is required</p>}

          <span className="label"> Type of User </span>
          <div className="types">
            <div
              className={`type ${type == "SHG" && "current"}`}
              onClick={() => handleTypeChange("SHG")}
            >
              SHG
            </div>
            <div
              className={`type ${type == "SME" && "current"}`}
              onClick={() => handleTypeChange("SME")}
            >
              SME
            </div>
          </div>
          <input type="submit" value="Login" disabled={isLoading} />
        </form>
      </div>
    </div>
  );
}

// Register.propTypes = {};

export default Login;
