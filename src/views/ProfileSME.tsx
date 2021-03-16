import React from "react";
import { useHistory } from "react-router";
import TitleHeader from "../component/TitleHeader";
import { useAuth } from "../hooks/Auth";

export default function ProfileSME() {
  let history = useHistory();

  const auth = useAuth();

  return (
    <div className="main_content">
      <TitleHeader title="Profile" user_type="SHG" />
      <button
        className="button"
        onClick={(e) => {
          auth?.signout(() => {
            history.push("/");
          });
        }}
      >
        Signout
      </button>
    </div>
  );
}
