import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton, Switch } from "antd";
import { Link } from "react-router-dom";
import CardProduct from "./card/productcard";

import { ListProductBy } from "../../function/product";

import Loading from "./card/Loading";
const bestseller = () => {
  const { Meta } = Card;
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    LoadData()
  },[]);
  const LoadData = () => {
    ListProductBy("sold", "desc", 3)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
       
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <>
    <div className="container">
        {loading? (
          <Loading count={3} />
        ) : (
          <div className="row">
            {products.map((item, index) => (
              <div key={index} className="col-4">
                <CardProduct product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    
    
    
    
    
    
    </>
  )
}

export default bestseller