import React, { useContext, createContext, useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { BACKEND_URL } from "../constants/constants";

export type signupForm = {
  id: string;
  name: string;
  password: string;
  jwt: string;
};

export type registerForm = {
  email: string;
};

export type loginForm = {
  email: string;
  password: string;
};

class SHGUser {
  id: string;
  jwt: string;

  name: string;
  phone: string;
  contact: string;
  user_type: string;
  industry_type: string;
  account_number: string;
  branch_code: string;

  name_SHG: string;
  production_cap: string;
  order_size: string;

  constructor(
    id: string,
    jwt: string,

    name: string,
    phone: string,
    contact: string,
    user_type: string,
    industry_type: string,
    account_number: string,
    branch_code: string,

    name_SHG: string,
    production_cap: string,
    order_size: string
  ) {
    this.id = id;
    this.jwt = jwt;

    this.name = name;
    this.phone = phone;
    this.contact = contact;
    this.user_type = user_type;
    this.industry_type = industry_type;
    this.account_number = account_number;
    this.branch_code = branch_code;

    this.name_SHG = name_SHG;
    this.production_cap = production_cap;
    this.order_size = order_size;
  }
}

class SMEUser {
  id: string;
  jwt: string;

  name: string;
  phone: string;
  contact: string;
  user_type: string;
  industry_type: string;
  account_number: string;
  branch_code: string;

  address: string;
  product_sold: string;

  constructor(
    id: string,
    jwt: string,

    name: string,
    phone: string,
    contact: string,
    user_type: string,
    industry_type: string,
    account_number: string,
    branch_code: string,

    address: string,
    product_sold: string
  ) {
    this.id = id;
    this.jwt = jwt;

    this.name = name;
    this.phone = phone;
    this.contact = contact;
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
      .post(`${BACKEND_URL}/login`, data)
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
  register(data: registerForm, cb: (response: AxiosResponse) => void) {
    authConnector.isAuthenticated = false;
    axios
      .post(`${BACKEND_URL}/register`, data)
      .then((response) => {
        // console.log(response);
        cb(response);
      })
      .catch((error) => {
        // console.log(error.response);
        cb(error.response);
      });
  },
  signup(data: signupForm, cb: (response: AxiosResponse) => void) {
    authConnector.isAuthenticated = false;
    axios
      .post(`${BACKEND_URL}/signup`, data, {
        headers: {
          Authorization: `Bearer ${data.jwt}`,
        },
      })
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
  register: (data: registerForm, cb: (response: AxiosResponse) => void) => void;
  signup: (data: signupForm, cb: (response: AxiosResponse) => void) => void;
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
        localStorage.setItem("jwt", user.jwt);
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

  const register = (
    data: registerForm,
    cb: (response: AxiosResponse) => void
  ) => {
    return authConnector.register(data, (response) => {
      setUser(null);
      cb(response);
    });
  };

  const signup = (data: signupForm, cb: (response: AxiosResponse) => void) => {
    return authConnector.signup(data, (response) => {
      setUser(null);
      cb(response);
    });
  };

  const authHeader = (): AxiosRequestConfig => {
    if (user !== null) {
      return {
        headers: {
          Authorization: `Bearer ${user?.jwt}`,
        },
      };
    }
    return {};
  };

  return {
    user,
    login,
    signout,
    register,
    signup,
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
