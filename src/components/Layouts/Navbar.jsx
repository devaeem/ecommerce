import React, { useState }  from 'react'
import { useNavigate ,Link } from "react-router-dom";

const Navbar = () => {
    const navgate = useNavigate();
    const login = () => {
        navgate("/login");
    }

  return (
   <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">E-com</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
         <Link to="/" className="nav-link">หน้าแรก</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/register">สมัครสมาชิก</a>
        </li>
       
       
      </ul>
      <form className="d-flex" role="search">
       
        <button className="btn btn-primary" type="button" onClick={login}>Login</button>
      </form>
    </div>
  </div>
</nav>

   </>
  )
}

export default Navbar