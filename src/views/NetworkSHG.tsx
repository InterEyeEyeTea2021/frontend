import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronDown, Search } from "react-feather";
import { Link } from "react-router-dom";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL, prod_images } from "../constants/constants";
import { SHGUser, useAuth } from "../hooks/Auth";
import { SHGprofileData } from "../types";

export default function NetworkSHG() {
  const auth = useAuth();
  const [shg_data, setSHG_data] = useState<SHGprofileData[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/users/shg`)
      .then((res) => {
        console.log(res.data);
        res.data.reverse();
        let fshg: SHGprofileData[] = res.data.filter((s: SHGprofileData) => {
          return s.shg_id != (auth?.user as SHGUser).shg_id;
        });
        setSHG_data(fshg);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main_content">
      <TitleHeader title="Network" user_type="SHG"></TitleHeader>
      <div className="right_aligned">
        <p>SHGs</p>
        <button className="default small">
          Filters
          <ChevronDown></ChevronDown>
        </button>
      </div>
      <div className="search_bar">
        <input type="text" name="search" id="search" placeholder="Search" />
        <button className="button small">
          <Search></Search>
        </button>
      </div>
      <p>Connect with SHGs near you!</p>
      <div className="cards">
        {shg_data?.map((t, i) => (
          <Link to={`/portfolio/${t.shg_id}`} className="no_style">
            <div className="shg card">
              <img src={t.image_uri} alt="" />
              <h1>{t.name}</h1>
              <p>{t.industry_type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
