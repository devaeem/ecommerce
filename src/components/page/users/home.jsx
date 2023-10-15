import React from "react";
import Nav from "../../Layouts/NavbarUser";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { useNavigate, Link,NavLink  } from "react-router-dom";
import NewProduct from './newproduct'
import BestSeller from './bestseller'

const home = () => {
  const { user } = useSelector((state)=>({...state}))
  
  const dispatch = useDispatch();
    const navgate = useNavigate();
    
  return (
    <>
   
        <Nav />
        <div className="container">
        <div className="row">
          <div className="col-12 mt-2 ">
           {/* {NEW PRODUCTS} */}
           <h1 className="text-center display-3 p-3 mb-5">สินค้ามาใหม่</h1>
           <NewProduct />
          </div>

          <div className="col-12 mt-2 ">
           {/* {BEST SELLER} */}
           <h1 className="text-center display-4 p-3 mb-5">สินค้าขายดี</h1>
           <BestSeller />
          </div>
        </div>
      </div>
    </>
  );
};

export default home;
