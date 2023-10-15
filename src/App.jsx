import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/page/auth/Register";
import Login from "./components/page/auth/Login";
import Home from "./components/page/Home";
import Navbar from "./components/Layouts/Navbar";
import Homeadmin from "./components/page/admin/home";
import AdminMember from "./components/page/admin/mamber";
import Admindashbord from "./components/page/admin/dashbord";
import Createcategory from "./components/page/admin/createcategory";

import Editcategory from "./components/page/admin/editcategory";

import Updatecategory from "./components/page/admin/products/updateproduct";
import HomeUser from "./components/page/users/home";

import Product from "./components/page/admin/products/products";
import Order from "./components/page/admin/order";

//user
import SingleProduct from './components/page/product'
import Shop from './components/page/shop/shop'
import Cart from './components/page/users/cart'
import Checkout from './components/page/shop/Checkout'
import WishList from './components/page/shop/wishList'
import History from './components/page/shop/history'


import Dashborduser from "./components/page/users/home";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../src/components/function/Auth";
import UserRoute from "./components/routes/UserRoute";
import AdminRoute from "./components/routes/AdminRoute";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const idtoken = localStorage.token;
  if (idtoken) {
    currentUser(idtoken)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: "LOGIN",
          playload: {
            token: idtoken,
            username: res.data.username,
            role: res.data.role,
          },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      {/* <h1 className="text-center mt-2">Hello React </h1> */}
      {/* <Register /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Homeadmin />
            </AdminRoute>
          }
        />


<Route
          path="/admin/update-category/:id"
          element={
            <AdminRoute>
              <Editcategory />
            </AdminRoute>
          }
        />

<Route
          path="/admin/update-product/:id"
          element={
            <AdminRoute>
              <Updatecategory />
            </AdminRoute>
          }
        />


<Route
          path="/admin/product"
          element={
            <AdminRoute>
              <Product />
            </AdminRoute>
          }
        />

<Route
          path="/admin/create-category"
          element={
            <AdminRoute>
              <Createcategory />
            </AdminRoute>
          }
        />


 <Route

 
          path="/admin/member"
          element={
            <AdminRoute>
              <AdminMember />
            </AdminRoute>
          }
        />

<Route
          path="/admin/dashbord"
          element={
            <AdminRoute>
              <Admindashbord />
            </AdminRoute>
          }
        />
<Route
          path="/admin/order"
          element={
            <AdminRoute>
              <Order />
            </AdminRoute>
          }
        />





        <Route
          path="/user"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />

<Route
          path="/user/product/:id"
          element={
            <UserRoute>
              <SingleProduct />
            </UserRoute>
          }
        />

<Route
          path="/user/shop"
          element={
            <UserRoute>
              <Shop />
            </UserRoute>
          }
        />

<Route
          path="/user/cart"
          element={
            <UserRoute>
              <Cart />
            </UserRoute>
          }
        />
        <Route
          path="/user/checkout"
          element={
            <UserRoute>
              <Checkout />
            </UserRoute>
          }
        />
         <Route
          path="/user/wishList"
          element={
            <UserRoute>
              <WishList />
            </UserRoute>
          }
        />
         <Route
          path="/user/history"
          element={
            <UserRoute>
              <History />
            </UserRoute>
          }
        />
        
        {/* <Route path="/dashborduser" element={<HomeUser />} /> */}
      </Routes>
    </>
  );
}

export default App;
