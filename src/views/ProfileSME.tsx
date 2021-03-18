import React from "react";
import { useHistory } from "react-router";
import TitleHeader from "../component/TitleHeader";
import { useAuth } from "../hooks/Auth";

export default function ProfileSME() {
  let history = useHistory();

  const auth = useAuth();

  return (
    <div className="main_content">
      <TitleHeader title="Profile" user_type="SME" />
      <img
        src={
          auth?.user?.profile_image_uri ??
          `http://tinygraphs.com/isogrids/${auth?.user?.name}?theme=seascape&numcolors=4`
        }
        alt=""
      />
      <div className="user_panel">
        <div className="name">{auth?.user?.name}</div>
        <button
          className="button small default"
          onClick={(e) => {
            auth?.signout(() => {
              history.push("/");
            });
          }}
        >
          Signout
        </button>
      </div>
    </div>
  );
}
