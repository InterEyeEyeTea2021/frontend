import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import TitleHeader from "../component/TitleHeader";
import { BACKEND_URL, prod_images } from "../constants/constants";
import { useAuth } from "../hooks/Auth";
import BidForm from "./BidForm";
import axios from "axios";

interface Product {
  product_id: number;
  shg_id: number;
  name: string;
  description: string;
  image_uri: string;
  min_size: string;
  price: string;
}

export default function Product() {
  const { register, handleSubmit, errors } = useForm();
  const [product, setProduct] = useState<Product>();

  const auth = useAuth();
  let history = useHistory();
  let { id }: { id: string } = useParams();
  const is_sme = auth?.user && auth.user.user_type === "SME";

  const data = {
    image: "",
    prod_name: "Product X",
    description: "Short detail of the prod",
    min_size: 10,
    price: 100,
    media: [
      {
        type: "image",
        uri: "https://i.imgur.com/khUO2T7.png",
      },
      {
        type: "image",
        uri: "https://i.imgur.com/khUO2T7.png",
      },
    ],
  };

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/product/${id}`)
      .then((res) => {
        console.log(res.data, "product");
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (data: any) => {
    // setIsLoading(true);
    console.log("Submitted Form Data: ", data);
  };

  const handleProductDelete = () => {
    axios
      .delete(`${BACKEND_URL}/product/${id}`, auth?.authHeader())
      .then((res) => {
        console.log(res.data, "product deleted");
        history.push("/portfolio");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main_content">
      <TitleHeader
        title="Product"
        user_type={auth?.user?.user_type as string}
      />
      <div className="full_image">
        <img src={product?.image_uri} alt="" />
      </div>

      <div className="detail">
        <div className="label">Name of Product</div>
        <div className="value">{product?.name}</div>
      </div>

      <div className="detail description">
        <div className="label">Description</div>
        <div className="value">{product?.description}</div>
      </div>

      <div className="detail">
        <div className="label">Minimum Size</div>
        <div className="value">{product?.min_size}</div>
      </div>

      <div className="detail">
        <div className="label">Price</div>
        <div className="value">{product?.price}</div>
      </div>
      {is_sme ? (
        <Link className="button" to={`/product/${product?.product_id}/tender`}>
          Create Tender
        </Link>
      ) : (
        <div className="edit">
          <button className="button" onClick={handleProductDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
