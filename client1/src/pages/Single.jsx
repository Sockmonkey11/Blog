import React from "react";
import Edit from "../img/edit.jpg"
import Delete from "../img/delete.jpg"
import { Link, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useEffect} from "react";
import{useState} from "react";
import { useLocation } from "react-router-dom";
import moment from "moment"
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import DOMPurify from "dompurify";


const Single = () => {
  const [post, setPost] = useState({});

  const location=useLocation()
  const navigate=useNavigate()

  const postId= location.pathname.split("/")[2]
  const{currentUser}=useContext(AuthContext)

  useEffect(()=>{
    const fetchData=async ()=>{
      try{
        const res= await axios.get(`http://localhost:8800/api/posts/${postId}`)
        console.log(res.data)
        setPost(res.data)

      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[postId])

  const handleDelete= async()=>{
    try{

      await axios.delete(`http://localhost:8800/api/posts/${postId}`,{
        
        withCredentials: true
        
      });

      navigate("/")
      
    } catch(err){
      console.log(err)
    }
    
  }
  return( 
  <div className='single'>
    <div className="content">
      <img src={`../upload/${post?.img}`} alt=""/>
    <div className="user"> 
     { post.userImg &&<img src={post.userImg} alt=""/>}
    <div className="info">
    <span> {post.username}</span>
    <p>Posted {post.date ? moment(post.date).fromNow() : 'Just now'}</p>
    </div>
    {currentUser.username === post.username &&(
      <div className="edit"> 
      <Link to={"/write?edit=2"} state={post}>
      <img src={Edit} alt=""/>
      </Link>
      <img onClick={handleDelete} src={Delete} alt=""/>
    </div>
    )}
     </div>
     <h1>{post.title}</h1>
     <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p>
    </div>
<Menu cat={post.cat}/>
   </div>


  )
};

export default Single;
