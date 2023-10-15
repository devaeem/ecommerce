import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/NavbarUser";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getWishList, removeWishList } from "../../function/Uers";
import { Link } from 'react-router-dom'
const wishList = () => {


    const [ wishlist, setWishList ] = useState([])
    const { user } = useSelector((state)=>({...state}))
    useEffect(()=>{
        //code
       loadData()
    },[])
    const loadData = () =>{
        getWishList(user.token)
        .then((res)=>{
            setWishList(res.data.wishlist)
        })
    }

    const handleRemove =(productId) =>{
        removeWishList(user.token,productId)
        .then((res)=>{
            console.log(res.data)
            loadData()
        })
    }
    console.log(wishlist)
  return (
    <>
     <Navbar />
 
      <div className="container">
      <div className="row">
            <h1>หน้าสิ่งที่ปรารถนา</h1>
            {wishlist.map((item,index)=>
                <div key={index} className="alert alert-secondary">
                    <Link to={"/user/product/"+item._id}>
                    {item.title}
                    </Link>
                    <button  onClick={()=> handleRemove(item._id)} style={{float:'right'}} className="btn btn-outline-danger">ลบ</button>
                   
                </div>
            )}
          </div>

      
    
    </div>
    </>
  )
}

export default wishList