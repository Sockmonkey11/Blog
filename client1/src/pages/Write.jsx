import React, {useState, useEffect} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment"

const Write = () => {
  const state= useLocation().state
  const [value, setValue] = useState(state?.tilte||'');
  const [title, setTitle] = useState(state?.desc ||'');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat||'');
  useEffect(() => {
    setValue(state?.desc || "");
    setTitle(state?.title || "");
    setCat(state?.cat || "");
  }, [state]);
 const navigate = useNavigate()

const upload = async ()=>{
  try{
    const formData= new FormData()
    formData.append("file",file)
    const res= await axios.post("http://localhost:8800/api/upload",formData)
    return res.data
  }catch(err){
    console.log(err)
  }
}
const handleClick = async (e) => {
  e.preventDefault();
  const imgUrl = await upload();
  try {
    if (state) {
      await axios.put(
        `http://localhost:8800/api/posts/${state.id}`,
        { title, desc: value, cat, img: file ? imgUrl : "" },
        { withCredentials: true }
      );
    } else {
      await axios.post(
        `http://localhost:8800/api/posts/`,
        {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : "",
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        },
        { withCredentials: true }
      );
    }
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};
  return( 
  <div className="add">
   <div className="content">
    <input type="text" value ={title}placeholder="Title" onChange={(e)=>setTitle(e.target.value)}/>
    <div className="editorContainer">
      <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
    </div>
   </div>
  <div className="menu">
    <div className="item">
      <h1>Publish</h1>
      <span> 
        <b>Status: </b> Draft
      </span>
      <span> 
        <b>Visibility: </b> Public
      </span>
      <input style={{display:"none"}}type="file" name= "" id="file"onChange={(e)=>setFile(e.target.files[0])} />
      <label className="file"htmlFor="file">Uploaed Your Image</label>
      <div className="buttons">
        <button>Save as a draft</button>
        <button onClick={handleClick}>Publish</button>
      </div>
    </div>
    <div className="item">
      <h1>Category</h1>
      <div className="cat">
      <input type="radio" checked= {cat === "art"} name="cat" value="art" id="art"onChange={(e)=>setCat(e.target.value)}/>
      <label htmlFor="art">Art</label>
      </div>
      <div className="cat">
      <input type="radio" checked= {cat === "tech"} name="cat" value="tech" id="tech"onChange={(e)=>setCat(e.target.value)}/>
      <label htmlFor="tech">Tech</label>
      </div>
      <div className="cat">
      <input type="radio" checked= {cat === "film"} name="cat" value="film" id="film"onChange={(e)=>setCat(e.target.value)}/>
      <label htmlFor="film">Film</label>
      </div>
      <div className="cat">
      <input type="radio" checked= {cat === "games"} name="cat" value="games" id="games"onChange={(e)=>setCat(e.target.value)}/>
      <label htmlFor="games">Games</label>
      </div>
      <div className="cat">
      <input type="radio" checked= {cat === "food"} name="cat" value="food" id="food"onChange={(e)=>setCat(e.target.value)}/>
      <label htmlFor="food">Food</label>
      </div>
      <div className="cat">
      <input type="radio" checked= {cat === "music"} name="cat" value="music" id="music"onChange={(e)=>setCat(e.target.value)}/>
      <label htmlFor="music">Music</label>
      </div>
      
    </div>
   </div>
  </div>

  )
};

export default Write;
