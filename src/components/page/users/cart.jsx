import React from "react";
import Nav from "../../Layouts/NavbarUser";
import { useNavigate, Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartProducts from '../../page/shop/productsincart'
import { userCart } from '../../function/Uers'
const cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navgate = useNavigate();

  const getTotal = () => {
    return cart.reduce((currenValue, nextValue) => {
      return currenValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const handleSaveOrder = () => {
      alert("บันทึกรายการสินค้า")
      userCart(user.token,cart)
      .then(res=>{
        console.log(res);
        navgate('/user/checkout')
      }).catch(err=>{
        console.log(err);
      })
     
  };
  const showCartItem = () => (
    <table className="table table-bordered table-hover border-primary table-responsive table-striped">
      <thead className="table-dark">
        <tr>
          <td>รูปภาพ</td>
          <td>ชื่อสินค้า</td>
          <td>ราคา</td>
          <td>จำนวน</td>
          <td>ลบสินค้า</td>
        </tr>
      </thead>
      {cart.map((item)=>
      <CartProducts key={item._id}  item={item}/>
      )}
    </table>
  );

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row">
          <div className="col-8">
            <h4>ตะกร้าสินค้า / {cart.length} รายการสินค้า</h4>
            {!cart.length ? <p>ไม่มีสินค้าในตะกร้าสินค้า</p> : showCartItem()}
          </div>

          <div className="col-4">
            <h4>สรุปรายการสินค้า</h4>
            <hr />

            {cart.map((item, index) => (
              <p key={index}>
                {item.title} X {item.count} = {item.price * item.count}
              </p>
            ))}
            <hr />
            <h4>รวมทั้งหมด {getTotal()}</h4>
            <hr />
            {user ? (
              <button onClick={handleSaveOrder} className="btn btn-danger" disabled={!cart.length}>
                 
                ชำระเงิน
              
              </button>
            ) : (
              <button>
                <NavLink to="/login" state="user/cart" className="nav-link ">
                  เข้าสู่ระบบ
                </NavLink>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default cart;
