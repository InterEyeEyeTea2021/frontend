import axios from "axios";
import React, { useEffect, useState } from "react";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL, prod_images } from "../constants/constants";
import { useAuth } from "../hooks/Auth";
import { Link } from "react-router-dom";
import { ChevronDown, Search } from "react-feather";

interface Product {
  product_id: number;
  shg_id: number;
  name: string;
  description: string;
  image_uri: string;
  min_size: string;
  price: string;
}

export default function SearchSME() {
  const auth = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/product/all`)
      .then((res) => {
        console.log(res.data, "products");
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main_content">
      <TitleHeader title="Search" user_type="SME"></TitleHeader>
      <div className="right_aligned">
        <p>Products</p>
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
        {products.map((p, i) => (
          <Link to={`/product/${p.product_id}`} className="no_style">
            <div className="shg card">
              <img src={p.image_uri} alt="" />
              <h1>{p.name}</h1>
              <p>{p.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
