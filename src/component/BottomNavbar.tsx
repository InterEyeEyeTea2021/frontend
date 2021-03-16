import React from "react";
import * as Icon from "react-feather";
import { NavLink } from "react-router-dom";

export default function BottomNavbar() {
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
        <NavLink exact to="/portfolio">
          <li>
            <Icon.User />
            <p>PROFILE</p>
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}
