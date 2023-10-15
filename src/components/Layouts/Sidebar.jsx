import React, { useState } from "react";

const Sidebar = () => {
  return (
    <>
      <ul className="nav flex-column">
        <li className="nav-item display-5 ">
          <a className="nav-link  " aria-current="page" href="/user">
           USER
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="/user">
            Dashbord
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="/user">
            Member
          </a>
        </li>
    
        
      </ul>
    </>
  );
};

export default Sidebar;
