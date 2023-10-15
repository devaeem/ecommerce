import React from "react";
import Noimg from "../../../assets/noimg.jpg";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  DeleteOutlined, 
} from "@ant-design/icons";
const productsincart = ({ item }) => {
  const dispatch = useDispatch();
  const handleChangCount = (e) => {
    const count = e.target.value < 1 ? 1 : e.target.value;
    if (count > item.quantity) {
      toast.error("ปริมาณสูงสุดที่มีจำหน่าย: " + item.quantity);
      return;
    }
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    console.log(cart);

    cart.map((product, i) => {
      if (product._id == item._id) {
        cart[i].count = count;
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      playload: cart,
    });
  };
const handleRemove = ()=>{
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    console.log(cart);

    cart.map((product, i) => {
      if (product._id == item._id) {
        cart.splice(i,1)
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: "ADD_TO_CART",
      playload: cart,
    });
}
  return (
    <>
      <ToastContainer />
      <tbody>
        <tr>
          <td>
            {!item.images[0] ? (
              <img
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                src={Noimg}
              />
            ) : (
              <img
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                src={item.images[0].url}
              />
            )}
          </td>
          <td>{item.title}</td>
          <td>{item.price}</td>
          <td>
            <input
              onChange={handleChangCount}
              style={{ width: "60px" }}
              className="form-control"
              type="number"
              value={item.count}
            />
          </td>
          <td>
            <DeleteOutlined onClick={handleRemove}  className="text-danger " />
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default productsincart;
