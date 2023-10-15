import React from "react";
import Noimg from "../../../../assets/noimg.jpg";
import { EditOutlined, EllipsisOutlined, SettingOutlined ,DeleteOutlined ,EyeOutlined,ShoppingCartOutlined} from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
import { Link, json } from "react-router-dom";
import _ from 'lodash'
import { useSelector,useDispatch } from 'react-redux'

const productcard = ({ product}) => {
  // console.log(product);
  const dispatch = useDispatch();

  const { _id,title, description, images } = product;
  const { Meta } = Card;

  const handleaddtocart = ()=>{

    console.log('click add');
    let cart = []
    if(localStorage.getItem('cart')){
     // cart = JSON.parse(localStorage.getItem('cart')) 
      cart = JSON.parse(localStorage.getItem('cart'));
    }
    cart.push({
      ...product,
      count:1
    })
    let unique = _.uniqWith(cart,_.isEqual)
    localStorage.setItem("cart",JSON.stringify(unique))
    dispatch({
      type:"ADD_TO_CART",
      playload:unique
    })


    
  }


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Card
             className="p-1"
              hoverable
            
              cover={
                <img
                
                style={{height:"150px",objectFit:"cover"}}
                  alt="example"
                  src={images && images.length ? images[0].url : Noimg}
                  
                />
                
              }
              actions={[
          
              <Link to={'/user/product/'+_id}>
                <EyeOutlined />
              </Link>
                  ,
                    <ShoppingCartOutlined onClick={handleaddtocart} />
                   
              
                
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

export default productcard;
