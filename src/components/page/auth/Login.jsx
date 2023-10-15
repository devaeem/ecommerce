import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { login } from "../../function/Auth";
import { useDispatch } from "react-redux";
import { useNavigate ,useLocation } from "react-router-dom";
import Navbar from "../../Layouts/Navbar";
import { Spin } from "antd";

const Login = () => {
  const navgate = useNavigate();
  const dispatch = useDispatch();
  const location =useLocation();
  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const roleBaseRedirect = (role) => {
    console.log(role);
    let intended = location.state
    if(intended){
      navgate('../'+intended);
    }else{

    if (role === "admin") {
      navgate("/admin");
    } else {
      navgate("/user");
    }
  }
  };

  const handelChange = (e) => {
    console.log(e.target.value);
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    login(value)
      .then((res) => {
        toast.success('login Success')
        console.log(res.data);
        dispatch({
          type: "LOGIN",
          playload: {
            token: res.data.token,
            username: res.data.playload.user.username,
            role: res.data.playload.user.role,
          },
        });
        localStorage.setItem("token", res.data.token);
        roleBaseRedirect(res.data.playload.user.role);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      
      });
  };

  return (
    <>
      <Navbar />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <ToastContainer />

      <div className="container ">
        <div className="row">
          <h1 className="text-center mt-2">
            {loading ? (
              <h1>
                กำลังเข้าสู่ระบบ... <Spin />
              </h1>
            ) : (
              <h1>เข้าสู่ระบบ </h1>
            )}
          </h1>

          <div className="col"></div>
          <div className="col">
            <from onSubmit={handleSubmit}>
              <div className="mb-3 align-items-start">
                <label for="exampleFormControlInput1" className="form-label ">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Please enter your username."
                  name="username"
                  onChange={handelChange}
                />

                <label
                  for="exampleFormControlInput1"
                  className="form-label mt-2 "
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Please enter your password."
                  name="password"
                  onChange={handelChange}
                />

                <div class="d-grid gap-2 mt-3">
                  <button
                    class="btn btn-success"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    เข้าสู่ระบบ
                  </button>
                </div>
               
              </div>
            </from>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
