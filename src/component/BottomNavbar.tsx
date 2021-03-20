import React from "react";
import * as Icon from "react-feather";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

export default function BottomNavbar() {
  const auth = useAuth();
  const is_sme = auth?.user && auth.user.user_type === "SME";

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

        {!is_sme && (
          <NavLink exact to="/network">
            <li>
              <Icon.Share2 />
              <p>NETWORK</p>
            </li>
          </NavLink>
        )}

        <NavLink exact to={is_sme ? "/profile" : "/portfolio"}>
          <li>
            <Icon.User />
            <p>PROFILE</p>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}
