import React,{useState,useEffect} from "react";
import Nav from "../../Layouts/NavbarAdmin";

import { Link } from "react-router-dom";
import  { category,listcategory,deletecategory } from "../../function/category"
import { useSelector } from 'react-redux'
import { toast,ToastContainer } from 'react-toastify';

const createcategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user.token);
    const [values,setValues]=useState({
        name:"",
    })
    useEffect(()=>{
        loadData(user.token);
    },[])

    const [categories,setCatgory] = useState([])

const loadData =  (authtoken) => {
    listcategory(authtoken)
    .then((res)=>{
        setCatgory(res.data);
    }).catch((err)=>{
        console.log(err);
    })
}

const handleRemove = (id) =>{
    deletecategory(user.token,id)
    .then((res)=>{
        console.log(res);
        loadData(user.token);
        toast.success('Remove Data ' + res.data.name);
    }).catch((err)=>{
        console.log(err);
    })
}


const handleChangcategory = (e)=>{  
    
console.log(values.name);
setValues({...values,[e.target.name]:e.target.value})
}

const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(values.name);
    category(user.token,values).then((res)=>{
        loadData(user.token);
        console.log(res.data);
        toast.success('Insert Data ' + res.data.name);
    }).catch((err)=>{
        console.log(err);
        toast.error('Sever Err ' + err.data);
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
          <div className="col-12 mt-2">
            <h1>สร้างหมวดหมู่</h1>
          </div>
          <div className="col-6 mt-2">
           
              <label for="inputPassword5" className="form-label">
                หมวดหมู่ 
              </label>
              <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChangcategory}
                className="form-control"
                aria-describedby="passwordHelpBlock"
              />
              <button type="submit" className="btn btn-outline-success mt-2" >เพื่มหมวดหมู่</button>
            </form>
          </div>
        </div>

        <div className="col-12">
        <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">NO.</th>
      <th scope="col">หมวดหมู่</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    {categories.map((item,index)=>(
        <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{item.name}</td>
     
      <td>
        
        <Link className="btn btn-outline-warning mx-2" to={"/admin/update-category/"+item._id}>
        แก้ไข
        </Link>
        <button className="btn btn-outline-danger mx-2" onClick={()=>handleRemove(item._id)}>ลบ</button>
      </td>
    </tr>

    ))}
    
   
  </tbody>
</table>
        </div>
      </div>
    </>
  );
};

export default createcategory;
