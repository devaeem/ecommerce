import React from "react";
import Noimg from "../../../../assets/noimg.jpg";
import { EditOutlined, EllipsisOutlined, SettingOutlined ,DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
import { Link } from "react-router-dom";
const cardproducts = ({ product,handleRemove }) => {
  console.log(product);
  const { _id,title, description, images } = product;
  const { Meta } = Card;
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Card
             className="p-2"
              hoverable
            
              cover={
                <img
                
                style={{height:"150px",objectFit:"cover"}}
                  alt="example"
                  src={images && images.length ? images[0].url : Noimg}
                  
                />
                
              }
              actions={[
          
                <Link to={"/admin/update-product/"+_id}><EditOutlined className="text-warning"  /></Link>,

                <DeleteOutlined className="text-danger"  
                onClick={()=>handleRemove(_id)}
                />
              ]}
            >
              <Meta title={title} description={description} />
              
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default cardproducts;
