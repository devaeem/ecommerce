import React, { useState, useEffect } from "react";
import Nav from "../../Layouts/NavbarAdmin";
import { useSelector } from "react-redux";
import { getOrders } from "../../function/Uers";
 import { updateStatusOrder, getOrdersAdmin } from "../../function/chabg";
// antd
import { Tabs, Table } from "antd";
import { ToastContainer, toast } from 'react-toastify';
const { TabPane } = Tabs;

const order = () => {
    const { user } = useSelector((state) => ({ ...state }));
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        //code
        loadData();
      }, []);
    
      const loadData = () => {
        getOrdersAdmin(user.token).then((res) => {
          setOrders(res.data);
        });
      };
      console.log(orders);
    
      const handleChangeStatus = (orderId, orderstatus) => {
        updateStatusOrder(user.token, orderId, orderstatus).then((res) => {
          console.log(res.data);
          toast.info("Updated " + res.data.orderstatus + " Success");
          loadData();
        });
      };
      const orderCard = orders.map((item, index) => {
        return (
          <div key={index} className="card m-3">
            <p>
              Order by <b>{item.orderBy.username}</b>
              <br />
              {"   " + item.orderstatus}
            </p>
            {/* Select */}
            <select
              value={item.orderstatus}
              onChange={(e) => handleChangeStatus(item._id, e.target.value)}
              style={{ width: "200px", alignSelf: "center" }}
              className="form form-control"
            >
              <option value="Not Process">Not Process</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
            {/* Table */}
            <table className="table table-bordered">
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Price</td>
                  <td>Count</td>
                </tr>
              </thead>
              {/* 2 Loop Table */}
              {item.products.map((p, i) => (
                <tr>
                  <td>{p.product.title}</td>
                  <td>{p.price}</td>
                  <td>{p.count}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3}>
                  ราคาสุทธิ:{" "}
                  <b>
                    <u>{item.cartTotal}</u>
                  </b>
                </td>
              </tr>
            </table>
          </div>
        );
      });
      const columns = [
        {
          title: "ชื่อผู้ใช้",
          dataIndex: "orderBy",
          render: (item, i) => <>{item.username}</>,
        },
        {
          title: "รายการสินค้า",
          render: (item, i) => (
            <ol>
              {item.products.map((p, i) => (
                <li>
                  {p.product.title}{" "}
                  <b>
                    {p.price}x{p.count}
                  </b>
                </li>
              ))}
            </ol>
          ),
        },
        {
          title: "ราคารวมสุทธิ",
          dataIndex: "cartTotal",
          key: "cartTotal",
        },
        {
          title: "สถานะ",
          dataIndex: "orderstatus",
          key: "orderstatus",
        },
        {
          title: "อัพเดทสถานะ",
          render: (item) => (
            <select
              value={item.orderstatus}
              onChange={(e) => handleChangeStatus(item._id, e.target.value)}
              style={{ width: "200px", alignSelf: "center" }}
              className="form form-control"
            >
              <option value="Not Process">Not Process</option>
              <option value="Processing">Processing</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          ),
        },
      ];
      const tableBoot = (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">ชื่อผู้ใช้</th>
              <th scope="col">รายการสินค้า</th>
              <th scope="col">ราคารวมสุทธิ</th>
              <th scope="col">สถานะ</th>
              <th scope="col">อัพเดทสถานะ</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, i) => (
              <tr>
                <th scope="row">{item.orderBy.username}</th>
    
                <td>
                  <ol>
                    {item.products.map((p) => (
                      <li>
                        {p.product.title}{" "}
                        <b>
                          {p.price}x{p.count}
                        </b>
                      </li>
                    ))}
                  </ol>
                </td>
    
                <td>{item.cartTotal}</td>
                <td>{item.orderstatus}</td>
               
               
                <td>
                  <select
                    value={item.orderstatus}
                    onChange={(e) => handleChangeStatus(item._id, e.target.value)}
                    style={{ width: "200px", alignSelf: "center" }}
                    className="form form-control"
                  >
                    <option value="Not Process">Not Process</option>
                    <option value="Processing">Processing</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
    
    
              </tr>
            ))}
          </tbody>
        </table>
      );
  return (
    <>
    <Nav />

    <ToastContainer />
    <div className="container-fluid">
      <div className="row">
    

        <div className="col-12 text-center">
          <Tabs defaultActiveKey="1">
            <TabPane tab="Tab 1" key="1">
              Order Card
              {orderCard}
            </TabPane>

            <TabPane tab="Tab 2" key="2">
              Table Atnd
              <Table dataSource={orders} columns={columns} />
            </TabPane>

            <TabPane tab="Tab 3" key="3">
              Table Boostrap
              {tableBoot}
            </TabPane>
          </Tabs>
        </div>
      </div>
      </div>
    </>
  )
}

export default order