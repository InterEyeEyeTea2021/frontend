import React, { useContext, createContext, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { BACKEND_URL } from "../constants/constants";

export type registerForm_SHG = {
  name: string;
  phone: string;
  WAcontact: string;
  user_type: string;
  industry_type: string;
  account_number: string;
  branch_code: string;

  name_SHG: string;
  production_cap: string;
  order_size: string;
};

export type registerForm_SME = {
  name: string;
  phone: string;
  WAcontact: string;
  user_type: string;
  industry_type: string;
  account_number: string;
  branch_code: string;

  address: string;
  product_sold: string;
};

export type loginForm = {
  username: string;
  user_type: string;
  password: string;
  remember: string;
};

export class SHGUser {
  shg_id: number;
  access_token: string;
  profile_image_uri: string;

  name: string;
  phone: string;
  WAcontact: string;
  user_type: string;
  industry_type: string;
  account_number: string;
  branch_code: string;

  name_SHG: string;
  production_cap: string;
  order_size: string;

  constructor(
    shg_id: number,
    access_token: string,
    profile_image_uri: string,

    name: string,
    phone: string,
    WAcontact: string,
    user_type: string,
    industry_type: string,
    account_number: string,
    branch_code: string,

    name_SHG: string,
    production_cap: string,
    order_size: string
  ) {
    this.shg_id = shg_id;
    this.access_token = access_token;
    this.profile_image_uri = profile_image_uri;

    this.name = name;
    this.phone = phone;
    this.WAcontact = WAcontact;
    this.user_type = user_type;
    this.industry_type = industry_type;
    this.account_number = account_number;
    this.branch_code = branch_code;

    this.name_SHG = name_SHG;
    this.production_cap = production_cap;
    this.order_size = order_size;
  }
}

export class SMEUser {
  sme_id: number;
  access_token: string;
  profile_image_uri: string;

  name: string;
  phone: string;
  WAcontact: string;
  user_type: string;
  industry_type: string;
  account_number: string;
  branch_code: string;

  address: string;
  product_sold: string;

  constructor(
    sme_id: number,
    access_token: string,
    profile_image_uri: string,

    name: string,
    phone: string,
    WAcontact: string,
    user_type: string,
    industry_type: string,
    account_number: string,
    branch_code: string,

    address: string,
    product_sold: string
  ) {
    this.sme_id = sme_id;
    this.access_token = access_token;
    this.profile_image_uri = profile_image_uri;

    this.name = name;
    this.phone = phone;
    this.WAcontact = WAcontact;
    this.user_type = user_type;
    this.industry_type = industry_type;
    this.account_number = account_number;
    this.branch_code = branch_code;

    this.address = address;
    this.product_sold = product_sold;
  }
}

const authConnector = {
  isAuthenticated: false,
  login(
    data: loginForm,
    cb: (user: SHGUser | SMEUser) => void,
    cbe: (e: AxiosError) => void
  ) {
    authConnector.isAuthenticated = true;
    axios
      .post(`${BACKEND_URL}/auth/login`, data)
      .then((response) => {
        // console.log(response);
        cb(response.data);
      })
      .catch(cbe);
  },
  signout(cb: () => void) {
    authConnector.isAuthenticated = false;
    cb();
  },
  registerSHG(data: registerForm_SHG, cb: (response: AxiosResponse) => void) {
    authConnector.isAuthenticated = false;
    axios
      .post(`${BACKEND_URL}/auth/signup/shg`, data)
      .then((response) => {
        // console.log(response);
        cb(response);
      })
      .catch((error) => {
        // console.log(error.response);
        cb(error.response);
      });
  },
  registerSME(data: registerForm_SME, cb: (response: AxiosResponse) => void) {
    authConnector.isAuthenticated = false;
    axios
      .post(`${BACKEND_URL}/auth/signup/sme`, data)
      .then((response) => {
        // console.log(response);
        cb(response);
      })
      .catch((error) => {
        // console.log(error.response);
        cb(error.response);
      });
  },
};

export type AuthContextType = {
  user: SHGUser | SMEUser | null;
  login: (
    data: loginForm,
    cb: () => void,
    cbe: (e: AxiosError) => void
  ) => void;
  signout: (cb: () => void) => void;
  registerSHG: (
    data: registerForm_SHG,
    cb: (response: AxiosResponse) => void
  ) => void;
  registerSME: (
    data: registerForm_SME,
    cb: (response: AxiosResponse) => void
  ) => void;
  authHeader: () => AxiosRequestConfig;
};

export const authContext = createContext<AuthContextType | null>(null);

function ProvideAuth(props: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>{props.children}</authContext.Provider>
  );
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState<SMEUser | SHGUser | null>(
    getUserFromLocalStorage()
  );

  const login = (
    data: loginForm,
    cb: () => void,
    cbe: (e: AxiosError) => void
  ) => {
    return authConnector.login(
      data,
      (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("access_token", user.access_token);
        cb();
      },
      cbe
    );
  };

  const signout = (cb: () => void) => {
    return authConnector.signout(() => {
      setUser(null);
      localStorage.removeItem("user");
      cb();
    });
  };

  const registerSME = (
    data: registerForm_SME,
    cb: (response: AxiosResponse) => void
  ) => {
    return authConnector.registerSME(data, (response) => {
      setUser(null);
      cb(response);
    });
  };

  const registerSHG = (
    data: registerForm_SHG,
    cb: (response: AxiosResponse) => void
  ) => {
    return authConnector.registerSHG(data, (response) => {
      setUser(null);
      cb(response);
    });
  };

  const authHeader = (): AxiosRequestConfig => {
    if (user !== null) {
      return {
        headers: {
          Authorization: `Bearer ${user?.access_token}`,
        },
      };
    }
    return {};
  };

  return {
    user,
    login,
    signout,
    registerSME,
    registerSHG,
    authHeader,
  };
}

function getUserFromLocalStorage(): SHGUser | SMEUser | null {
  let userJSON = localStorage.getItem("user");
  if (userJSON) {
    return JSON.parse(userJSON);
  }
  return null;
}

export { ProvideAuth, useAuth };
