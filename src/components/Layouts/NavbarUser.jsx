import React from "react";
import { useNavigate, Link,NavLink  } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux'
import { Avatar, Badge, Space } from 'antd';
const NavbarAdmin = () => {

 const { user,cart } = useSelector((state)=>({...state}))
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
          <a className="navbar-brand" href="/user">
           E-com
          </a>
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
              <li className="nav-item ">
                <NavLink  to="/user/shop" className="nav-link "  >
                  ร้านค้า
                </NavLink>
              </li>
            
              <li className="nav-item ">
              
      
             
                <NavLink  to="/user/cart" className="nav-link "  >
                <Badge count={cart.length} size="small" offset={[9,0]}>    ตะกร้าสินค้า  </Badge>
                </NavLink>
              
              </li>
              <li className="nav-item ">
                <NavLink  to="/user/wishList" className="nav-link "  >
                  สินค้าที่ชื่นชอบ
                </NavLink>
              </li>
              <li className="nav-item ">
                <NavLink  to="/user/history" className="nav-link "  >
                  ประวัติการสั่งซื้อ
                </NavLink>
              </li>
            
              <li className="nav-item">
             
              
              </li>
            </ul>
                           
           
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

            
           
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarAdmin;
