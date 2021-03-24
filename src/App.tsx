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
import SearchSME from "./views/SearchSME";
import SearchSHG from "./views/SearchSHG";
import ProfileSME from "./views/ProfileSME";
import ScrollToTop from "./component/ScrollToTop";
import { Toaster } from "react-hot-toast";
import NetworkSHG from "./views/NetworkSHG";
import Mela from "./views/Mela";
import Logistics from "./views/Logistics";

function App() {
  let auth = useAuth();

  return (
    <Router>
      <ScrollToTop />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            marginBottom: "100px",
          },
        }}
      />
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

          <PrivateRoute exact path="/search/">
            {auth?.user?.user_type === "SME" ? <SearchSME /> : <SearchSHG />}
          </PrivateRoute>

          {/* Network for SHG */}
          <PrivateRoute exact path="/network">
            <NetworkSHG />
          </PrivateRoute>

          {/* Bid form */}
          <PrivateRoute path="/tender/:id/bid" user_type="SHG">
            <BidForm />
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
          <Route path="/portfolio">
            <PortfolioRouter />
          </Route>

          {/* product */}
          <Route path="/product">
            <ProductRouter />
          </Route>

          <Route exact path="/profile">
            <ProfileSME />
          </Route>

          <Route exact path="/mela">
            <Mela />
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
      <Route path={`${path}/:id/logistics/`}>
        <Logistics />
      </Route>
      <Route path={`${path}/:id/payment/`}>
        <RequestPayment />
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
      <Route path={`${path}/status/:id`}>
        <TenderStatus />
      </Route>
    </Switch>
  );
}

function BidRouter() {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/:id`}>
        <BidStatus />
      </Route>
    </Switch>
  );
}

function PortfolioRouter() {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute user_type="SHG" exact path={path}>
        <Portfolio />
      </PrivateRoute>
      <PrivateRoute exact path={`${path}/:shg_id`}>
        <Portfolio />
      </PrivateRoute>
    </Switch>
  );
}

function ProductRouter() {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <PrivateRoute user_type="SHG" exact path={`${path}/add`}>
        <ProductEdit />
      </PrivateRoute>
      <PrivateRoute exact path={`${path}/:id`}>
        <Product />
      </PrivateRoute>
      <PrivateRoute exact path={`${path}/:id/tender`}>
        <TenderForm />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
