import axios from 'axios';


export const login = async (value) => 
await axios.post(import.meta.env.VITE_URL_API +'/login', value);

export const currentUser  = async (authtoken) => 
await axios.post(import.meta.env.VITE_URL_API +'/current-user', {},
{
   headers:{
      authtoken,
   },
});

export const currentAdmin  = async (authtoken) => 
await axios.post(import.meta.env.VITE_URL_API +'/current-admin', {},
{
   headers:{
      authtoken,
   },
});


