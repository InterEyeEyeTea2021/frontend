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

import "./styles/main.scss";
import TenderForm from "./views/TenderForm";
import TenderStatus from "./views/TenderStatus";
import BidForm from "./views/BidForm";

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
            <Route path="/tender/create">
              <TenderForm />
            </Route>
            <Route path="/tender/status">
              <TenderStatus />
            </Route>
            <Route path="/bid/create">
              <BidForm />
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
