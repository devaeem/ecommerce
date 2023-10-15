import React,{useState,useEffect} from 'react'
import Nav from "../../Layouts/NavbarAdmin";
import  { EditCategory,ReadCategory } from "../../function/category"
import { useParams,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const editcategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
        const navigate = useNavigate();
        const param =  useParams() 
        const [name,setName]=useState("")
useEffect(()=>{
    loadData(user.token,param.id)
},[])

const loadData = (authtoken,id) =>{
    ReadCategory(authtoken,id)
    .then((res)=>{
        setName(res.data.name);
    }).catch((err)=>{
            console.log(err);
    })
   
}

const handleSubmit = (e)=>{
    e.preventDefault()
    EditCategory(user.token,param.id,{name})
    .then(res=>{
      navigate('/admin/create-category')
      toast.success('Insert Data ' + res.data.name);
    }).catch(err=>{
        console.log(err);
    })
}
  return (
    <>
    <Nav />

    <div className="container">
        <div className="row">
          <div className="col-12 mt-2">
            <h1>แก้ไขหมวดหมู่</h1>
          </div>
          <div className="col-6 mt-2">
           
              <label for="inputPassword5" className="form-label">
                แก้ไขหมวดหมู่  {name}
              </label>
              <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={name}
                 autoFocus
                className="form-control"
                required
                onChange={(e)=>setName(e.target.value)}
                aria-describedby="passwordHelpBlock"
              />
              <button type="submit" className="btn btn-outline-success mt-2" >แก้ไขหมวดหมู่</button>
            </form>
          </div>
        </div>

      
      </div>
    </>
  )
}

export default editcategory