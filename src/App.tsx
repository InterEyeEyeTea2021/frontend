import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ProvideAuth } from "./hooks/Auth";
import PrivateRoute from "./component/PrivateRoute";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

import Home from "./views/Home";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import SMEPayments from "./views/SMEPayments"
import SHGPayments from "./views/SHGPayments"
import RequestPayment from "./views/paymentRequest"

import "./styles/main.scss";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/smepayments">
              <SMEPayments />
            </Route>
            <Route path="/shgpayments">
              <SHGPayments />
            </Route>
            <Route path="/paymentRequest">
              <RequestPayment />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
