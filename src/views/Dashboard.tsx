import React, { useState } from "react";
import { appendErrors, useForm } from "react-hook-form";
import { BACKEND_URL } from "../constants/constants";
import { useAuth } from "../hooks/Auth";
import axios from "axios";

function Dashboard() {
  const auth = useAuth();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
    </div>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
