import React, { useState, useEffect } from "react";
import Nav from "../../Layouts/NavbarAdmin";
import {
  Listuser,
  changStatus,
  changRole,
  removeUser,
  resetPassword
} from "../../function/Uers";
import { useSelector } from "react-redux";
import { Switch } from "antd";
import { Select, Space, Tag, Modal } from "antd";
import { DeleteOutlined, EditOutlined, RedoOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import moment from "moment/min/moment-with-locales";
const mamber = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [data, setData] = useState([]);
  const [selectData,setselectData]=useState([])
  
  // console.log("useSelector", user.token);
  // console.log("datauser", data);
  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    Listuser(authtoken)
      .then((res) => {
        setData(res.data);
        setselectData(res.data)
        const drops = new Set(res.data.map(item=>item.role))
         console.log(drops);
         setDrop([drops])
        /console.log("dataDrop",drop);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleonChang = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };

    changStatus(user.token, value)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleonChangrole = (e, id) => {
    console.log(e, id);
    let valuerole = {
      id: id,
      role: e,
    };
    changRole(user.token, valuerole)
      .then((res) => {
        console.log(res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success mx-2",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const handleRemove = (id, username) => {
    if (
      swalWithBootstrapButtons
        .fire({
          title: "คุณแน่ใจไหม?" + username,
          text: "คุณจะไม่สามารถลบสิ่งนี้ได้!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยืนยันการลบ",
          cancelButtonText: "ยกเลิก",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
              "Deleted!" + username,
              "ลบข้อมูลของคุณถูกลบแล้ว.",
              "success"
            );
            removeUser(user.token, id)
              .then((res) => {
                console.log(res);
                loadData(user.token);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
    ) {
    }
  };
  const handlereser = (islode) => {
    loadData(user.token);
  };
 
  const [drop,setDrop]=useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values,setValues] = useState({
    id:"",
    password:"",
  })
  const showModal = (id) => {
    // console.log(id);
    console.log(values);
    setValues({...values, id: id})
    setIsModalOpen(true);
    // setValues({...values, id: id});
  };
  const handleChangePassword = (e)=> {
   
    console.log(e.target.name);
    console.log(e.target.value);
    setValues({...values,[e.target.name]:e.target.value});
  }
  const handleOk = () => {
    console.log(values);
    resetPassword(user.token,values.id,{values})
    .then(res=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err.response);
    })
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const roleData = ["admin", "user"];
  const handleSelectRole =(e)=>{
      const value = e.target.value
      console.log(value);
      if(value =='all'){
        setselectData(data)
      }else{
        const filterData = data.filter((item,index)=>{
            return item.role ==value
        })
        setselectData(filterData);
      }

      
  }
  return (
    <>
      <Nav />

      <div className="container ">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mt-3 mb-2">MERN Stack ระบบล็อกอิน&จัดการผู้ใช้งาน</h1>
          </div>
          <div className="col-2">
            <button className="btn btn-primary">เพื่มสมาชิก</button>

            <button className="btn btn-primary mx-1" onClick={handlereser}>
            
              รีโหลด
            </button>

          </div>
          <div className="col-12"></div>
          <div className="col-2 mt-2">
          <select className="form-select" onChange={(e)=>handleSelectRole(e)}>
          <option value='all'>all</option>
        
       
             <option  value='admin'>admin</option>
             <option  value='user'>user</option>
        
      </select>

          </div>
      
          <div className="clo-md-12 mt-2">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NAME</th>
                  <th scope="col">EMAIL</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">ROLE</th>
                  <th scope="col">CREATED</th>
                  <th scope="col">UPDATED</th>
                  <th scope="col">Handle</th>
                </tr>
                <div className=""></div>
              </thead>
              <tbody>
                {selectData.map((item, index) => (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{item.username}</td>
                    <td>{item.email ? item.email : "ไม่พบข้อมูล"}</td>
                    <td>
                      {/* <Switch defaultChecked   onChange={onChange} /> */}
                      <Switch
                        checked={item.enabled}
                        onChange={(e) => handleonChang(e, item._id)}
                        checkedChildren="เปิดใช้งาน"
                        unCheckedChildren="ปิดใช้งาน"
                      />
                    </td>
                    {/* <td>{item.enabled  ?    <p className="text-success">เปิดใช้งาน</p>   : <p className="text-danger">ปิดใช้งาน</p>   }</td> */}

                    <td>
                      <Select
                        style={{ width: "100%" }}
                        value={item.role}
                        onChange={(e) => handleonChangrole(e, item._id)}
                      >
                        {roleData.map((item, index) => (
                          <Select.Option value={item} key={index}>
                            {" "}
                            {item == "admin" ? (
                              <Tag color="red">ADMIN</Tag>
                            ) : (
                              <Tag color="green">USER</Tag>
                            )}{" "}
                          </Select.Option>
                        ))}
                      </Select>
                      {/* {item.role} */}
                    </td>
                    <td>
                      {moment(item.createdAt)
                        .locale("th")
                        .startOf("day")
                        .fromNow()}
                    </td>
                    {/* {item.updatedAt} */}
                    <td>
                      {moment(item.updatedAt)
                        .locale("th")
                        .startOf(item.updatedAt)
                        .fromNow()}
                    </td>

                    <td>
                      <EditOutlined
                        onClick={()=>showModal(item._id)}
                        className="mx-2"
                        style={{ color: "yellow" }}
                      />
                      <DeleteOutlined
                        style={{ color: "red" }}
                        onClick={() => handleRemove(item._id, item.username)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <Modal
              title="แก้ไขข้อมูล"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>New Password:</p>
              <input type="password" name="password" onChange={handleChangePassword}  />
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default mamber;
