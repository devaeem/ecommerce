import React, { useState, useEffect } from "react";
import { readProduct } from "../function/product";
import { useParams } from "react-router-dom";
import Navbar from "../Layouts/NavbarUser";
import Singleproduct from "./users/card/Singleproduct";

const product = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
     loadData();
  }, []);

  const loadData = () => {
    readProduct(params.id)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  console.log(product);

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row pt-4">
          <Singleproduct product={product} />
        </div>
      </div>
    </>
  );
};

export default product;
