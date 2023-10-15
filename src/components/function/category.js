import axios from 'axios';

export const category  = async (authtoken,values) => 
await axios.post(import.meta.env.VITE_URL_API +'/category', values ,
{
    headers:{
       authtoken,
    },
 }
);


export const listcategory  = async (authtoken) => 
await axios.get(import.meta.env.VITE_URL_API +'/category',
{
    headers:{
       authtoken,
    },
 }
);

export const deletecategory  = async (authtoken,id) => 
await axios.delete(import.meta.env.VITE_URL_API +'/category/'+id,
{
    headers:{
       authtoken,
    },
 }
);

export const ReadCategory  = async (authtoken,id) => 
await axios.get(import.meta.env.VITE_URL_API +'/category/'+id,
{
      headers:{
         authtoken,
      },
   }
);

export const EditCategory  = async (authtoken,id,values) => 
await axios.put(import.meta.env.VITE_URL_API +'/category/'+id,values,
{
    headers:{
       authtoken,
    },
 }
);