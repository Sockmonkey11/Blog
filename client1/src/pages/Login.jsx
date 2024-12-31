import React from "react"
import { Link,useNavigate } from 'react-router-dom'
import axios from "axios"
import {useState} from "react"
import{useContext} from "react"
import{AuthContext} from "../context/authContext"

const Login = () => {
  const [inputs, setInputs]=useState({
    username:"",
    email:"",
    password:"",

    
  })
  const [err,setError]= useState(null)

  const handleChange = e =>{
    setInputs(prev=>({... prev, [e.target.name]: e.target.value}))
  }
const navigate=useNavigate()

const{login}= useContext(AuthContext);

  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
      await login(inputs)
    
      await axios.post("http://localhost:8800/api/auth/login",inputs,{withCredentials: true});   navigate("/")
      
    }catch(err){
      setError(err.response.data)
    }
  }
  return (
  <div className= "auth"> 
    <h1>
      Login
    </h1> 

    <form>
      <input type= "text" placeholder="username" name="username" onChange={handleChange} />
      <input type= "password" placeholder="password" name="password" onChange={handleChange} />
      <button onClick= {handleSubmit}>Login</button>
      {err && <p>{err}</p>}
      <span>Don't you have an account?<Link to="/register">Register Here!</Link>
      </span>
    </form>
  </div>
  )
}

export default Login
