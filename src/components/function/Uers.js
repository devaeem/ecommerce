import axios from 'axios';

export const register = async (value) => 
   await axios.post(import.meta.env.VITE_URL_API +'/user', value);



   export const Listuser  = async (authtoken) => 
   await axios.get(import.meta.env.VITE_URL_API +'/user', 
   {
      headers:{
         authtoken,
      },
   });


   export const changStatus  = async (authtoken,value) => 
   await axios.post(import.meta.env.VITE_URL_API +'/chang-status', value ,
   {
      headers:{
         authtoken,
      },
   });

   export const changRole  = async (authtoken,valuerole) => 
   await axios.post(import.meta.env.VITE_URL_API +'/chang-role', valuerole ,
   {
      headers:{
         authtoken,
      },
   });

   export const removeUser  = async (authtoken,id) => 
   await axios.delete(import.meta.env.VITE_URL_API +'/user/'+id ,
   {
      headers:{
         authtoken,
      },
   });

   export const resetPassword  = async (authtoken,id,values) => 
   await axios.put(import.meta.env.VITE_URL_API +'/user/'+id,values ,
   {
      headers:{
         authtoken,
      },
   });


   export const userCart  = async (authtoken,cart) => 
   await axios.post(import.meta.env.VITE_URL_API +'/user/cart', {cart} ,
   {
      headers:{
         authtoken,
      },
   });
   export const getUserCart  = async (authtoken) => {
   return await axios.get(import.meta.env.VITE_URL_API + "/users/cart", 
   {
      headers:{
         authtoken,
      },
   });

}

export const saveAddress  = async (authtoken,address) => 
await axios.post(import.meta.env.VITE_URL_API +'/users/address', {address} ,
{
   headers:{
      authtoken,
   },
});


export const emptyCart = async (authtoken) => {
   return await axios.delete(import.meta.env.VITE_URL_API + "/users/cart", {
     headers: {
       authtoken,
     },
   });
 };
 // Save Addresss

 // save order
 export const saveOrder = async (authtoken) => {
   return await axios.post(
      import.meta.env.VITE_URL_API  + "/user/order",
     {},
     {
       headers: {
         authtoken,
       },
     }
   );
 };
 export const getOrders = async (authtoken) => {
   return await axios.get(import.meta.env.VITE_URL_API  + "/users/orders", {
     headers: {
       authtoken,
     },
   });
 };
 
 // Wishlist
 
 export const getWishList = async (authtoken) => {
   return await axios.get(import.meta.env.VITE_URL_API  + "/users/wishlist", {
     headers: {
       authtoken,
     },
   });
 };
 
 export const addToWishList = async (authtoken, productId) => {
   return await axios.post(
      import.meta.env.VITE_URL_API  + "/users/wishlist",
     { productId },
     {
       headers: {
         authtoken,
       },
     }
   );
 };
 
 export const removeWishList = async (authtoken, productId) => {
   return await axios.put(
      import.meta.env.VITE_URL_API + "/users/wishlist/" + productId,
     {},
     {
       headers: {
         authtoken,
       },
     }
   );
 };