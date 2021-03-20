import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronDown, Search } from "react-feather";
import { Link } from "react-router-dom";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL, prod_images } from "../constants/constants";
import { useAuth } from "../hooks/Auth";
import { Fair } from "../types";

export default function Mela() {
  const auth = useAuth();
  const [fairs, setFairs] = useState<Fair[]>([
    {
      id: 1,
      name: "Garment Fair",
      description: "see the name",
      media: [
        {
          uri: "https://i.imgur.com/lJQq0LB.jpeg",
          type: "image",
        },
      ],
      industry_type: "Clothing",
      location: "Pragati Maidan",
      date: "10-3-21",
      fee: "100",
    },
    {
      id: 2,
      name: "Carpet Fair",
      description: "see the name",
      media: [
        {
          uri: "https://i.imgur.com/A04YEFJ.jpg",
          type: "image",
        },
      ],
      industry_type: "Clothing",
      location: "Pragati Maidan",
      date: "10-3-21",
      fee: "None",
    },
    {
      id: 3,
      name: "Sari ka mela",
      description: "see the name",
      media: [
        {
          uri: "https://i.imgur.com/lJQq0LB.jpeg",
          type: "image",
        },
      ],
      industry_type: "Clothing",
      location: "Pragati Maidan",
      date: "10-3-21",
      fee: "100",
    },
  ]);

  // useEffect(() => {
  //   axios
  //     .get(`${BACKEND_URL}/tender/all`)
  //     .then((res) => {
  //       // console.log(res);
  //       res.data.reverse();
  //       setTenders(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className="main_content">
      <TitleHeader title="Search" user_type="SHG"></TitleHeader>
      <div className="right_aligned">
        <p>Fairs</p>
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
        {fairs?.map((fair, i) => (
          <Link to={`/mela/${fair.id}`} className="no_style">
            <div className="shg card">
              <img src={fair.media[0].uri} alt="" />
              <h1>{fair.name}</h1>
              <p>{fair.location}</p>
              <p>Fee: Rs. {fair.fee}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
