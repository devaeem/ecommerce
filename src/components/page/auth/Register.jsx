import React, { useState } from "react";
import { register } from "../../function/Uers";
import Navbar from '../../Layouts/Navbar'
const Register = () => {
  const [value, setValue] = useState({
    username: "",
    password: "",
    Passwordconfirm: "",
  });
  const handelChange = (e) => {
    console.log(e.target.value);
    setValue({ ...value, [e.target.name]: e.target.value });

  };

  console.log(value)
  const handelSubmit = (e) => {  
    e.preventDefault();
    console.log(value);
    if (value.password !== value.Passwordconfirm) {
      alert("Password not match");
    } else {
        register(value)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };
  return (
    <>
    <Navbar /> 

    
      <div className="container ">
        <div className="row">
          <h1 className="text-center mt-2">Register  </h1>

    
            <div className="col"></div>
            <div className="col">
            <from onSubmit={handelSubmit}>
              <div className="mb-3 align-items-start">
      
                <label for="exampleFormControlInput1" className="form-label ">
                  Username
                </label>
                <input
                  type="text"
                  required
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
                <label
                  for="exampleFormControlInput1"
                  className="form-label mt-2 "
                >
                  Passwordconfirm
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Please enter your passwordconfirm."
                  name="Passwordconfirm"
                  onChange={handelChange}
                />
                <div class="d-grid gap-2 mt-3">
                  <button class="btn btn-success" disabled={value.password.length < 6} onClick={handelSubmit} type="submit">
                    submit
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

export default Register;
