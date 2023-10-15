import React, { useEffect, useState } from "react";
import Nav from "../../../Layouts/NavbarAdmin";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import  File from './fileupload'
import { Avatar, Badge, Space,Spin  } from "antd";

//function
import  { createProduct,removeProduct } from "../../../function/product"
import  { listcategory } from "../../../function/category"


const initialstate = {
  title: "สินค้าทดลอง",
  description: "DES",
  categories:[],
  price: "500",
  quantity: "5",
  category: "",
  images: [],
};
const products = () => {
  const { user } = useSelector((state) => ({ ...state }));


  const [values, setValues] = useState(initialstate);
  const [loading,setLoading]=useState(false)

useEffect(()=>{
  loadData(user.token)
},[])

  const loadData =(authtoken)=>{
    listcategory(authtoken).then(res=>{
      setValues({ ...values, categories: res.data });
    }).catch(err=>{
      console.log(err);
    })
  }



  const handleChang = (e) => {
    // console.log(e.target.name ,e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
const handleSubmit = (e) =>{
  console.log(values);
  e.preventDefault()
  createProduct(user.token,values)
  .then(res=>{
    console.log('value',res);
    toast.success('Insert Data ' + res.data.title);
  }).catch(err=>{
    console.log(err);
    toast.error('Insert Fail ');
  })
}

  return (
    <>
     <ToastContainer/>
{/* Same as */}
<ToastContainer />
      <Nav />
      <div className="container">
        <div className="row">
          <div className="col-12 mt-3">
            {loading 
             ?   <h1>กำลังโหลด...  <Spin /></h1>
             : <h1>เพื่มการสินค้า</h1>
             }
            
          </div>

          <div className="col-6 mt-3">
            <form onSubmit={handleSubmit}>
              <label  className="form-label">
                ชื่อสินค้า
              </label>

              <input
                type="text"
                name="title"
                value={values.title}
                className="form-control"
                onChange={handleChang}
              />

              <label  className="form-label">
                รายละเอียดสินค้า
              </label>

              <input
                type="text"
                name="description"
                value={values.description}
                className="form-control"
                onChange={handleChang}
              />

              <label className="form-label">
                ราคาสินค้า
              </label>

              <input
                type="number"
                name="price"
                value={values.price}
                className="form-control"
                onChange={handleChang}
              />
               <label  className="form-label">
                จำนวนสินค้า
              </label>

              <input
                type="number"
                name="quantity"
                value={values.quantity}
                className="form-control"
                onChange={handleChang}
              />
               <label  className="form-label">
                เลือกหมวดหมู่
              </label>

              <select
                type="text"
                name="category"
                value={values.category}
                className="form-control"
                onChange={handleChang}
              >
                <option>--เลือกหมวดหมู่--</option>
                {
                  values.categories.length > 0 && 
                 values.categories.map((item)=>(
                    <option key={item._id} value={item._id}>{item.name}</option>
                    
  ))
                }
                {/* <option>44</option> */}
                </select>

      <File  values={values}  setValues={setValues}  loading={loading} setLoading={setLoading} />
<br />

              <button type="submit" className="btn btn-outline-success mt-2">
                เพื่มสินค้า
              </button>
            </form>
          </div>



          <div className="col-12 mt-2">
                <h1>รายการสินค้า</h1>

          </div>
        </div>
      </div>
    </>
  );
};

export default products;
