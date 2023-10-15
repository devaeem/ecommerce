import React,{useState,useEffect} from 'react'
import Navbar from '../../Layouts/NavbarUser'
import { useNavigate, Link, NavLink } from "react-router-dom";
import { getUserCart,
  saveAddress ,
  emptyCart,
  saveOrder,
  getOrders,

} from '../../function/Uers'
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Checkout = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [products,setProducts]=useState([])
  const [Total,setTotal]=useState([])
  const [address,setAddress]=useState("")
  const [addressSaved,setAddressSaved]=useState(false)


  const dispatch = useDispatch();
  const navgate = useNavigate();

  useEffect(()=>{
    getUserCart(user.token)
    .then((res)=>{
      setProducts(res.data.products);
      setTotal(res.data.cartTotal)
    })
  },[])
const handleSaveAddress = () =>{
  console.log(address);
  saveAddress(user.token,address)
  .then(res=>{
    console.log(res.data);
    if(res.data.ok){
      setAddressSaved(true)
    }
  }).catch(err=>{
    console.log(err);
  })
}
const handleCreateOrder = () => {
  // code
  saveOrder(user.token).then((res) => {
    console.log(res.data);
    // clear DB
     emptyCart(user.token);
    // // clear store
    dispatch({
      type: "ADD_TO_CART",
      playload: [],
    });
    // local localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    // toast.success("Save Order Success");
    // navgate('/user/history')
  });
};
 
  return (
    <>
    <Navbar />
    <div className="container-fluid">
        <div className="row">
            <div className="col-6 mt-5">
              <h1>ที่อยู่</h1>
            <h1><ReactQuill  value={address} onChange={setAddress}/></h1>
           <button className='btn btn-info' onClick={handleSaveAddress}>บันทึกที่อยู่</button>
            </div>
            <div className="col-6">
            <h1>สรุปรายการคำสั่งซื้อ</h1>
            <hr />
            <h1>สินค้า {products.length}</h1>
            <hr />
            <h1>รายการสินค้า</h1>
        {products.map((item,i)=>
        <div key={i}>
              <p>
                {item.product.title} X {item.count} = {item.price * item.count}
              </p>
        </div>
        
        )
        
        
        
        }
<hr />
้<h1>รวมทั้งหมด: <b>{Total} บาท</b></h1>
<br />
<button disabled={!addressSaved} onClick={handleCreateOrder} className='btn btn-info' > ชำะเงิน</button>
            </div>
        </div>
    </div>
    
    
    
    </>
  )
}

export default Checkout