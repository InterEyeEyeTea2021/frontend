import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronDown, Search } from "react-feather";
import { Link } from "react-router-dom";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL, prod_images } from "../constants/constants";
import { useAuth } from "../hooks/Auth";

interface Tender {
  id: number;
  name: string;
  state: string;
  description: string;
  media: {
    uri: string;
    type: string;
  }[];
  milestones: {
    description: string;
    media: {
      uri: string;
      type: string;
    }[];
  }[];
  sme: {
    id: number;
    name: string;
    profile_image_uri: string;
    phone: string;
  };
}

export default function SearchSHG() {
  const auth = useAuth();
  const [tenders, setTenders] = useState<Tender[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/tender/all`)
      .then((res) => {
        // console.log(res);
        res.data.reverse();
        setTenders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main_content">
      <TitleHeader title="Search" user_type="SHG"></TitleHeader>
      <div className="right_aligned">
        <p>Tenders</p>
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
      <br />
      <div className="cards">
        {tenders?.map((t, i) => (
          <Link to={`/tender/${t.id}/bid`} className="no_style">
            <div className="shg card">
              <img src={t?.media[0]?.uri} alt="" />
              <h1>{t.name}</h1>
              <p>{t.sme.name}</p>
              <p>{t.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
