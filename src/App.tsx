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
import TenderForm from "./views/TenderForm";
import TenderStatus from "./views/TenderStatus";
import BidForm from "./views/BidForm";
import OrderStatus from "./views/OrderStatus";
import Portfolio from "./views/Portfolio";
import Product from "./views/Product";
import ProductEdit from "./views/ProductEdit";

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <PrivateRoute exact path="/dashboard">
              <Dashboard />
            </PrivateRoute>

            <Route exact path="/tender/create">
              <TenderForm />
            </Route>
            <Route exact path="/tender/status">
              <TenderStatus />
            </Route>
            <Route exact path="/bid/create">
              <BidForm />
            </Route>
            <Route exact path="/order/1">
              <OrderStatus />
            </Route>

            <Route exact path="/portfolio">
              <Portfolio />
            </Route>

            <Route exact path="/product">
              <Product />
            </Route>

            <Route exact path="/product/edit">
              <ProductEdit />
            </Route>
  
            <Route exact path="/smepayments">
              <SMEPayments />
            </Route>
            <Route exact path="/shgpayments">
              <SHGPayments />
            </Route>
            <Route exact path="/paymentRequest">
              <RequestPayment />
            </Route>
            <Route exact path="/">
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
