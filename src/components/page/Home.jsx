import React from 'react'
import Navbar from '../Layouts/Navbar'
//Latout


const Home = () => {
  return (
    <div>
      <Navbar /> 
      <div className="container ">
        <div className="row">
          <div className="clo-md-12 mt-5">
            <h1 className='text-center'>E-commerce MERN-STACK</h1>
            <hr />
            <h4 className='text-center'>TEST:ADMIN</h4>
            <h4 className='text-center'>username:admintest</h4>
            <h4 className='text-center'>Password:123456789</h4>
            <hr />
            <h4 className='text-center'>TEST:USER</h4>
            <h4 className='text-center'>username:testuser</h4>
            <h4 className='text-center'>Password:123456789</h4>
            <hr />
          </div>
        </div>
        </div>
    </div>
  )
}

export default Home