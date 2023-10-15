import React, { useEffect, useState } from "react";
import Navbar from "../../Layouts/NavbarUser";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../users/card/productcard";
import { ListProduct,searchFiilters } from "../../function/product";
import {listcategory} from '../../function/category'
import { Spin ,Slider, Switch,Checkbox  } from "antd";
import Search from "../../page/users/card/search";
const shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price,setPrice]=useState([0,0])
  const [ok, setOk] = useState(false);

  const [category, setCategory] = useState([]);
  const [categoryselect, setCategoryselect] = useState([]);

  const { search } = useSelector((state)=>({...state}))
  // console.log("ssdsdaeem",search.text);
  const { text } = search

  useEffect(() => {
    loadData();
    listcategory().then(res=>setCategory(res.data))



  },[]);

  console.log("cat",category);
  const loadData = () => { 
    setLoading(true);
    ListProduct(12)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
       
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  
  
  useEffect(()=>{
    let delay  = setTimeout(()=>{
      fetchDataFilter({query: text })
      if(!text){
        loadData();
      }
    },300)
    return ()=>clearTimeout(delay)
  },[text])


  useEffect(()=>{
    fetchDataFilter({price}) //[0,0]
  },[ok])







  const fetchDataFilter = (arg)=>{
    searchFiilters(arg)
    .then((res)=>{
      setProducts(res.data);
    })
  }


  const handlePrice = (value)=>{
    setPrice(value);

    setTimeout(()=>{
      setOk(!ok)
    },300)
  }
  const handleChack =(e) =>{
   let inchack = e.target.value
   let inState = [...categoryselect]
   let findchack =inState.indexOf(inchack)

   if(findchack === -1){
    inState.push(inchack)
   }else{
    inState.splice(findchack,1)
   }
      setCategoryselect(inState)
      fetchDataFilter({category:inState})
      console.log("inState",inState);
if(inState.length <1){
  loadData();
}



  }

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3 mt-3">
            <h6>ฟิลเตอร์ / ค้นหา</h6>
            <Search />
            <hr />
              <h4>ค้นหาด้วยราคาสินค้า</h4> 
               <Slider value={price} onChange={handlePrice} range  max={100000} />
               <hr />
               <h4>ค้นหาด้วยหมวดหมู่สินค้า</h4> 
               {category.map((item,index)=>(
                <Checkbox  key={index}  onChange={handleChack} value={item._id}>{item.name}</Checkbox>
               )
                
               )}
               
          </div>
          <div className="col-9 mt-3">
            {loading ? (
              <h4 className="text-danger">
              กำลังโหลด.... <Spin />
            </h4>
             
            ) : (
              <h4 className="text-info">รายการสินค้า </h4>
            )}
            {products.length < 1 && <p>ไม่พบสินค้า</p>}

            <div className="row pb-5">
              {products.map((item, index) => (
                <div key={index} className="col-4 mt-3">
                  <ProductCard product={item} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default shop;
