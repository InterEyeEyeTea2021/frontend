import axios from "axios";
import React, { useEffect, useState } from "react";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL } from "../constants/constants";
import { useAuth } from "../hooks/Auth";

export default function SearchSHG() {
  const auth = useAuth();
  const [tenders, setTenders] = useState();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/tender/all`, {
        // ...auth?.authHeader(),
        // params: {
        //   id: auth?.user?.id,
        // },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main_content">
      <TitleHeader title="Search" user_type="SHG"></TitleHeader>
    </div>
  );
}
