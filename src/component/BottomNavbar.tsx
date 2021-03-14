import React from "react";
import * as Icon from "react-feather";
import { NavLink } from "react-router-dom";

export default function BottomNavbar() {
  return (
    <nav>
      <div className="bottomNav">
        <ul>
          <li>
            <NavLink exact to="/">
              <Icon.Home />
              <p>HOME</p>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/order/1">
              <Icon.File />
              <p>ORDERS</p>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/something">
              <Icon.Search />
              <p>SEARCH</p>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/portfolio">
              <Icon.User />
              <p>PROFILE</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
