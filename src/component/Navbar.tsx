import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

import logo from "../images/logo.svg";

export default function Navbar() {
  let auth = useAuth();

  return (
    <nav>
      <div className="wrapper">
        <Link className="no_style" to="/dashboard">
          <header>
            <img src={logo} alt="Logo" />
            <h1>GrameenSetu</h1>
          </header>
        </Link>
        {auth?.user == null && (
          <ul>
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            {auth?.user ? (
              <>
                <li>
                  <NavLink exact to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li
                  onClick={() =>
                    auth?.signout(() => console.log("User signed out"))
                  }
                >
                  Signout
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink exact to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink exact to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
