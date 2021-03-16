import React from "react";
import { useAuth } from "./hooks/Auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";

import Home from "./views/Home";
import DashboardSME from "./views/DashboardSME";
import DashboardSHG from "./views/DashboardSHG";
import Login from "./views/Login";
import Register from "./views/Register";
import SMEPayments from "./views/SMEPayments";
import SHGPayments from "./views/SHGPayments";
import RequestPayment from "./views/paymentRequest";

import "./styles/main.scss";
import TenderForm from "./views/TenderForm";
import TenderStatus from "./views/TenderStatus";
import BidForm from "./views/BidForm";
import OrderStatus from "./views/OrderStatus";
import Portfolio from "./views/Portfolio";
import Product from "./views/Product";
import ProductEdit from "./views/ProductEdit";
import BidStatus from "./views/BidStatus";
import BottomNavbar from "./component/BottomNavbar";

function App() {
  let auth = useAuth();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          {/* Authentication and Signup */}
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>

          <PrivateRoute exact path="/dashboard/">
            {auth?.user?.user_type === "SME" ? (
              <DashboardSME />
            ) : (
              <DashboardSHG />
            )}
          </PrivateRoute>

          {/* Tender */}
          <PrivateRoute path="/tender" user_type="SME">
            <TenderRouter />
          </PrivateRoute>

          {/* Bid */}
          <Route path="/bid">
            <BidRouter />
          </Route>

          {/* Order */}
          <Route path="/order">
            <OrderRouter />
          </Route>

          {/* Portfolio */}
          <Route exact path="/portfolio">
            <Portfolio />
          </Route>

          {/* product */}
          <Route exact path="/product/1">
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
        {auth?.user != null && <BottomNavbar />}
        <Footer />
      </div>
    </Router>
  );
}

function OrderRouter() {
  let { path, url } = useRouteMatch();
  let auth = useAuth();

  return (
    <Switch>
      <Route exact path={`${path}/:id`}>
        <OrderStatus />
      </Route>
      <Route path={`${path}/:id/payment/:pay_id`}>
        {auth?.user?.user_type === "SME" ? <SMEPayments /> : <SHGPayments />}
        {/* <RequestPayment /> */}
      </Route>
    </Switch>
  );
}

function TenderRouter() {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <TenderForm />
      </Route>
      <Route path={`${path}/:id`}>
        <TenderStatus />
      </Route>
    </Switch>
  );
}

function BidRouter() {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <BidForm />
      </Route>
      <Route path={`${path}/:id`}>
        <BidStatus />
      </Route>
    </Switch>
  );
}

export default App;
