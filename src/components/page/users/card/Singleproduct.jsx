import React from "react";
import Noimg from "../../../../assets/noimg.jpg";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
  EyeOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Skeleton, Switch, Tabs } from "antd";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import _ from 'lodash'
import { useSelector,useDispatch } from 'react-redux'
import TabPane from "antd/es/tabs/TabPane";
import {addToWishList} from '../../../function/Uers'
const Singleproduct = ({ product }) => {
  const { user } = useSelector((state)=>({...state}))
  const { _id, title, description, images, quantity, sold, price ,category } = product;
  const { Meta } = Card;
  const dispatch = useDispatch();

  const handleaddtocart = ()=>{

    console.log('click add');
    let cart = []
    if(localStorage.getItem('cart')){
     // cart = JSON.parse(localStorage.getItem('cart')) 
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({
      ...product,
      count:1
    })
    let unique = _.uniqWith(cart,_.isEqual)
    localStorage.setItem("cart",JSON.stringify(unique))
    dispatch({
      type:"ADD_TO_CART",
      playload:unique
    })


    
  }

const handleAddtowishlist = (e)=>{
  console.log(_id)
    if(user){
      addToWishList(user.token,_id)
      .then(res=>{
        console.log(res.data)
        
      }).catch((err)=>{
        console.log(err)
      })
    }else{
      
    }
}

  return (
    <>
      <div className="col-7">
        <Carousel autoPlay showArrows={true} infiniteLoop width={"100%"}>
          {images &&
            images.map((item) => (
              <img style={{ objectFit: "cover" }} src={item.url} />
            ))}
        </Carousel>
      </div>
      <div className="col-5">
        <h1 className="bg-info p-3">{title}</h1>
        <Card
          className="p-1"
          actions={[
            <a onClick={handleAddtowishlist}>
              <HeartOutlined className="text-danger " /> <br />
              <p className="nav-item text-danger nav-link">เพื่มในรายการโปรด</p>
              </a>  ,
            <>
              <ShoppingCartOutlined onClick={handleaddtocart}  />
              add to cart
            </>,
          ]}
        >
          {/* <Meta title={title} description={description} /> */}
          <ul class="list-group list-group-flush">
            <li className="list-group-item">
              ราคา
              <span className="float-end">{price} บาท</span>
            </li>
            <li className="list-group-item">
              จำนวน
              <span className="float-end">{quantity} ชิ้น/จำนวน/อัน</span>
            </li>

            <li className="list-group-item">
              จำนวนที่ขายไปแล้ว
              <span className="float-end">{sold} ครั้ง</span>
            </li>
            {category &&
            <li className="list-group-item">
              หมวดหมู่
              <span className="float-end">{category.name}</span>
            </li>
            }
          </ul>
        </Card>
      </div>
      <div className="col-12">
        <Tabs>
          <TabPane tab="รายละเอียดสินค้า" key="1">
          {description}
          </TabPane>
          
        </Tabs>
      </div>
    </>
  );
};

export default Singleproduct;
