import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

export default function Navbar() {
  let auth = useAuth();

  return (
    <nav>
      <div className="wrapper">
        <h1>Drishtee</h1>
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
      </div>
    </nav>
  );
}
