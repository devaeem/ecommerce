import React, {useState,useEffect } from "react";
import Nav from "../../../Layouts/NavbarAdmin";
import { useParams, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { readProduct, updateProduct } from "../../../function/product";
import { listcategory } from "../../../function/category";
import File from "./fileupload";
import { Avatar, Badge, Space,Spin  } from "antd";
const updateproduct = () => {
    const initialstate = {
        title: "",
        description: "",
        categories:[],
        price: "",
        quantity: "",
        category: "",
        images: [],
      };

    const { user } = useSelector((state) => ({ ...state }));
    const navigate = useNavigate();
    const param =  useParams() 
    const [loading,setLoading]=useState(false)
    const [values,setValues]=useState(initialstate)
    const [category,setCategory]=useState("")
    useEffect(()=>{
        loadData()
    },[])
    const loadData = () =>{
        readProduct(param.id)
        .then((res)=>{
            setValues({...values,...res.data});
        }).catch((err)=>{
                console.log(err);
        })

        listcategory(user.token)
        .then((res)=>{
            setCategory(res.data);
        }).catch((err)=>{
                console.log(err);
        })
       
    }


    console.log("valuess",values);
    console.log("category",category);
  
    const handleChang = (e) => {
        // console.log(e.target.name ,e.target.value);
        setValues({ ...values, [e.target.name]: e.target.value });
        console.log(values);
      };

      const handleSubmit = (e) =>{
        
        e.preventDefault()
        updateProduct(user.token,values._id,values)
        .then((res)=>{
          console.log(res);
          toast.success('Update Data ');
          navigate('/admin')
        }).catch((err)=>{
          console.log(err);
          toast.error('Update Fail ');
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
             : <h1>แก้ไขสินค้า</h1>
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
                value={values.category._id}
                className="form-control"
                onChange={handleChang}
              >
              
                
                {
                  category.length > 0 && 
                  category.map((item)=>(
                    <option key={item._id} value={item._id}>{item.name}</option>
                    
  ))
                }
                </select>

      <File  values={values}  setValues={setValues}  loading={loading} setLoading={setLoading} />
<br />

              <button type="submit" className="btn btn-outline-success mt-2">
                อัพเดพสินค้า
              </button>
            </form>
          </div> <div className="col-6 mt-3">
         
          </div>
        </div>
      </div>
    </>
  );
};

export default updateproduct;
