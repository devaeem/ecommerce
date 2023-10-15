import React, { useEffect, useState } from "react";
import Nav from "../../Layouts/NavbarAdmin";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, Link, NavLink } from "react-router-dom";
import UserPro from "../../../assets/user.png";
import { ToastContainer, toast } from "react-toastify";
import { ListProduct ,removeProduct} from "../../function/product";
import CradProducts from "./card/cardproducts";

const home = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [product, setProduct] = useState([]);
  const [loading, setLaoding] = useState(false);

  useEffect(() => {
    loadData(50);
  }, []);

  const loadData = (count) => {
    setLaoding(true);
    ListProduct(count)
      .then((res) => {
        setLaoding(false);
        setProduct(res.data);
      })
      .catch((err) => {
        setLaoding(false);
        console.log(err);
      });
  };

  const handleRemove = (id)=>{
    // console.log(id);
    if(window.confirm("delete product!!!")){
      removeProduct(user.token,id)
      .then(res=>{
        loadData(50)
          console.log(res.data);    
          toast.success('ลบสินค้า ' + res.data.title  + ' สำเร็จ');
      }).catch(err=>{
        console.log(err);
        toast.error('Delete Fail ');
      })
    }
    }


  return (
    <>
      <Nav />
      <ToastContainer>

      </ToastContainer>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5 t">
            {loading ? <h1>กำลังโหลด...</h1> : <h1>Home ADmin</h1>}
          </div>
          {product.map((item) => (
            <div key={item._id} className="col-3 mt-5 t mx-auto pb-3">
              <CradProducts product={item} 
              handleRemove={handleRemove}
              
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default home;
