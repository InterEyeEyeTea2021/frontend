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

class User {
  id: string;
  name: string;
  jwt: string;

  constructor(id: string, name: string, jwt: string) {
    this.id = id;
    this.name = name;
    this.jwt = jwt;
  }
}

const authConnector = {
  isAuthenticated: false,
  login(
    data: loginForm,
    cb: (user: User) => void,
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
  user: User | null;
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
  const [user, setUser] = useState<User | null>(getUserFromLocalStorage());

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

function getUserFromLocalStorage(): User | null {
  let userJSON = localStorage.getItem("user");
  if (userJSON) {
    return JSON.parse(userJSON);
  }
  return null;
}

export { ProvideAuth, useAuth };
