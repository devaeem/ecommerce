import axios from 'axios';


export const createProduct  = async (authtoken,values) => 
await axios.post(import.meta.env.VITE_URL_API +'/product', values ,
{
    headers:{
       authtoken,
    },
 }
);

export const ListProduct  = async (count) => 
await axios.get(import.meta.env.VITE_URL_API +'/products/'+ count ,{

}
);

export const ListProductBy  = async (sort, order, limit) => 
await axios.post(import.meta.env.VITE_URL_API +'/productby',{
   sort, order, limit
}

// {
//     headers:{
//        authtoken,
//     },
//  }
);

export const removeProduct  = async (authtoken,id) => 
await axios.delete(import.meta.env.VITE_URL_API +'/product/'+id ,
{
    headers:{
       authtoken,
    },
 }
);

export const readProduct  = async (id) => 
await axios.get(import.meta.env.VITE_URL_API +'/product/'+id,);
// {
//     headers:{
//        authtoken,
//     },
//  }


export const updateProduct  = async (authtoken,id,product) => 
await axios.put(import.meta.env.VITE_URL_API +'/product/'+id ,product,
{
    headers:{
       authtoken,
    },
 }
);

export const searchFiilters  = async (arg) => 
await axios.post(import.meta.env.VITE_URL_API +'/search/filters',arg);