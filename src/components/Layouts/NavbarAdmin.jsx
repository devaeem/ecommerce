import React from 'react'
import { useNavigate, Link,NavLink  } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";


const NavbarAdmin = () => {
  const { user } = useSelector((state) => ({ ...state }));
  
    const dispatch = useDispatch();
    const navgate = useNavigate();


    const logout = () => {
        console.log("dfdf")
        dispatch({
          type: "LOGOUT",
          playload: null,
        });
        navgate("/login");
      };
  return (
   
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
      <a className="navbar-brand fw-bold" href="/admin">E-COM</a>
                       
       
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           
            <li className="nav-item">
            <NavLink  to="/admin/member" className="nav-link " >
            สมาชิก
              </NavLink>
          
            </li>

            <li className="nav-item">
            <NavLink  to="/admin/create-category" className="nav-link " >
            หมวดหมู่
              </NavLink>
          
            </li>
            <li className="nav-item">
            <NavLink  to="/admin/product" className="nav-link " >
            สินค้า
              </NavLink>
          
            </li>
            <li className="nav-item">
            <NavLink  to="/admin/order" className="nav-link " >
            จัดการออเดอร์
              </NavLink>
          
            </li>
           
          </ul>
          <form className="d-flex" role="search">
            {/* <button className="btn btn-danger" type="button" >
              Logout
            </button> */}
           <ul className="navbar-nav mr-2">
           <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        {user.username}
        </a>
      
        <ul className="dropdown-menu">
      
        
          
          <div className="d-grid gap-2">
          <button className="btn btn-danger btn-sm col-8 mx-auto mt-3" type="button" onClick={logout}>ออกจากระบบ</button>

                          </div>
         
        </ul>
      </li>

           </ul>

          </form>
        </div>
      </div>
    </nav>
  </>
  )
}

export default NavbarAdmin