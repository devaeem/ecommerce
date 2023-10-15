import React from "react";
import Resize from "react-image-file-resizer";
import { useSelector } from "react-redux";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space, Spin } from "antd";
import { toast, ToastContainer } from "react-toastify";
const fileupload = ({ values, setValues, loading, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const handlechangfile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);
      let allfilieupload = values.images;
      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                import.meta.env.VITE_URL_API + "/images",
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user.token,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allfilieupload.push(res.data);
                setValues({ ...values, images: allfilieupload });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };
  const handleremove = (public_id) => {
    setLoading(true)
    console.log(public_id);
    const {images} = values;
    axios
      .post(
        import.meta.env.VITE_URL_API + "/removeimages",
        { public_id },
        {
          headers: {
            authtoken: user.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setLoading(false)
        let filterImages = images.filter(item=>{
            return  item.public_id !=public_id
        })
       setValues({...values,images:filterImages });
       toast.success('Delete img success' );
      })
      .catch((err) => {
        setLoading(false)
        console.log(err);
      });
  };
  return (
    <>
  
      <div className="col-12 mt-1 mx-3">
        <br />
        {values.images &&
          values.images.map((item) => (
            <Space>
              <Badge
                onClick={() => handleremove(item.public_id)}
                style={{ cursor: "pointer" }}
                count="x"
              >
                <Avatar
                  src={item.url}
                  shape="square "
                  className="mx-3 m-3"
                  size={120}
                />
              </Badge>
            </Space>
          ))}
        <hr />
      </div>

      <label className=" btn btn-primary mt-1">
        เลือกไฟล์รูปภาพสินค้า
        <input
          onChange={handlechangfile}
          type="file"
          hidden
          className="form-control"
          multiple
          accept="images/*"
          name="file"
        />
      </label>
    </>
  );
};
export default fileupload;
