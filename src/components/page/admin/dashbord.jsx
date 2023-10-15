import React from "react";
import Nav from "../../Layouts/NavbarAdmin";
const dashbord = () => {
  return (
    <>
      <Nav />
      <div className="container mt-5 ">
        <div className="row">
          <div className="col">
          <div className="card">
              <div className="card-body">จำนวนสมาชิกในระบบทั้งหมด</div>
            </div>
          </div>

          <div className="col">
            <div className="card">
              <div className="card-body">จำนวนสมาชิกในระบบทั้งหมด</div>
            </div>
          </div>

          <div className="col">
            
            <div className="col">
            <div className="card">
              <div className="card-body">จำนวนผู้ดูแลในระบบทั้งหมด</div>
            </div>
          </div>
            
            </div>
        </div>
      </div>
    </>
  );
};

export default dashbord;
