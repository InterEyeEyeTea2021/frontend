import axios from "axios";
import React, { useEffect, useState } from "react";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL, profile_pics } from "../constants/constants";
import { useAuth } from "../hooks/Auth";
import { Link } from "react-router-dom";
interface SHGuserData {
  WAContact: string;
  industry_type: string;
  name: string;
  phone: string;
  sme_id: number;
}

export default function SearchSME() {
  const auth = useAuth();
  const [SHGs, setSHGs] = useState<SHGuserData[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users/shg`)
      .then((res) => {
        console.log(res.data);
        setSHGs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main_content">
      <TitleHeader title="Search" user_type="SME"></TitleHeader>
      <input type="text" name="search" id="search" placeholder="Search" />
      <br />
      <div className="cards">
        {SHGs.map((s, i) => (
          <Link to={"/portfolio/" + s.sme_id} className="no_style">
            <div className="shg card">
              <img src={profile_pics[i % 2]} alt="" />
              <h1>{s.name}</h1>
              <p>{s.industry_type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
