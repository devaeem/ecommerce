import React from 'react'
import Nav from "../../Layouts/NavbarUser";
import { useSelector } from 'react-redux'

const dashbord = () => {
  const { user } = useSelector((state)=>({...state}))
  return (
    <div>
 <Nav />
<h1>{user.username}</h1>


    </div>
  )
}

export default dashbord