import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL, prod_images } from "../constants/constants";
import { useAuth } from "../hooks/Auth";

interface tender {
  id: number;
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
  };
}

export default function SearchSHG() {
  const auth = useAuth();
  const [tenders, setTenders] = useState<tender[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/tender/all`)
      .then((res) => {
        // console.log(res);
        setTenders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main_content">
      <TitleHeader title="Search" user_type="SHG"></TitleHeader>
      <input type="text" name="search" id="search" placeholder="Search" />
      <br />
      <div className="cards">
        {tenders?.map((t, i) => (
          <Link to={`/tender/${t.id}/bid`} className="no_style">
            <div className="shg card">
              <img src={prod_images[i % 6]} alt="" />
              <h1>Tender</h1>
              <p>{t.sme.name}</p>
              <p>{t.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
