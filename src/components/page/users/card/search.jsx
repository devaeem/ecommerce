import React from 'react'
import { useNavigate, Link,NavLink  } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'

const search = () => {

    const dispatch = useDispatch();
    const navgate = useNavigate();
    const {search} = useSelector((state)=>({...state}));
    const { text } = search
console.log(text);
const handleChang =(e)=>{
    console.log(e.target.value);
    dispatch(
      {
        type:"SEARCH_QUERY",
        playload:{text:e.target.value}
      }
    )
}
const handleSubmit = (e) =>{
  e.preventDefault()
  navgate("/user/shop?" + text)
}



  return (
    <>
    
    <form onSubmit={handleSubmit} className="d-flex" >
        <input className="form-control " 
          type="search" 
        onChange={handleChang}
      
        
        />
        {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
      </form>

    
    </>
  )
}

export default search