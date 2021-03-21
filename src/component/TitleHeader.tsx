import React from "react";
import * as Icon from "react-feather";
export default function TitleHeader(props: {
  title: string;
  user_type: string;
}) {
  return (
    <div className="title_header">
      <h1>{props.title}</h1>
      <div className="user_type">
        {props.user_type === "SHG" ? "Producer" : "Buyer"}
      </div>
      <div className="icon">
        <Icon.Bell></Icon.Bell>
      </div>
    </div>
  );
}
