import React from "react";
import Logo from "../img/logo.jpg"
import {Link} from "react-router-dom"
import{useContext} from "react"
import{AuthContext} from "../context/authContext"
const Navbar = () => {

  const{currentUser,logout}= useContext(AuthContext);

  return (
  <div className='navbar'>
    <div className="container">
        <div className="logo"> 
          <Link to="/">
          <img src={Logo} alt=""/>
          </Link>
        </div>
        <div className="links"> 
          <Link className="link" to="/?cat=art"> 
          <h6>ART</h6> </Link>
          <Link className="link" to="/?cat=tech"> 
          <h6>TECH</h6> </Link>
          <Link className="link" to="/?cat=film"> 
          <h6>FILM</h6> </Link>
          <Link className="link" to="/?cat=games"> 
          <h6>GAMES</h6> </Link>
          <Link className="link" to="/?cat=food"> 
          <h6>FOOD</h6> </Link>
          <Link className="link" to="/?cat=music"> 
          <h6>MUSIC</h6> </Link>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span onClick={logout}>Logout</span>
           ) : (

          <Link className="link"to="/login"> 
          Login
          </Link>)}
          <span className="write">
            <Link className="link" to= "/write">Write</Link>
          </span>
        </div>
      </div>
    </div>

  )
};

export default Navbar;