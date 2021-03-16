import React from "react";
import * as Icon from "react-feather";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

export default function BottomNavbar() {
  const auth = useAuth();
  return (
    <nav className="bottomNav">
      <ul>
        <NavLink exact to="/dashboard">
          <li>
            <Icon.Home />
            <p>HOME</p>
          </li>
        </NavLink>
        {/* <NavLink exact to="/dashboard/#orders">
          <li>
            <Icon.File />
            <p>ORDERS</p>
          </li>
        </NavLink> */}
        <NavLink exact to="/search">
          <li>
            <Icon.Search />
            <p>SEARCH</p>
          </li>
        </NavLink>
        <NavLink
          exact
          to={auth?.user?.user_type === "SME" ? "/profile" : "/portfolio"}
        >
          <li>
            <Icon.User />
            <p>PROFILE</p>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}
