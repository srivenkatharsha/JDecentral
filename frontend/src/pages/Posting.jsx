import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import {checkUser, checkJournalist} from "../utils/management.js"
import { useNavigate } from 'react-router-dom';


const Posting = ({hide, setLatest}) => {
  const navigate = useNavigate();
  const [topic, setTopic] = useState("");
  const [headLine, setHeadLine] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  useEffect(
    () => {
      let check = async () => {
        if(!await checkUser()){
          navigate("/login");
        } 
        if(!await checkJournalist()){
          navigate("/");
        }
      }
      check();
    }, []
  );

  const handleSubmit = async e => {
    e.preventDefault();
    if (topic == "") {
      setError(true);
    } else {
    setError(false);
    let userName = sessionStorage.getItem('userName');
    let isJournalist = sessionStorage.getItem('isJournalist');
    let body = {userName : userName, date: new Date(), headLine : headLine, thumbnailImage : thumbnailImage, content : content};
    let obj = {isJournalist : isJournalist, topicName : topic, body : body};
    let baseUrl = "http://localhost:3000/postArticle";
    const response = await axios.post(baseUrl, obj);
    const data = response.data;
    alert(data['message']);
    setLatest(true);
    window.location = "localhost:5173/";
    }
  }

  return (
    <div className="w-full h-full flex justify-center">
    <Navbar posting={true} />
    <form onSubmit={e => handleSubmit(e)} className="p-12 rounded-xl w-4/5 mx-auto my-auto my-30 border-slate-200 border-2 flex flex-col align-middle bg-slate-100">
      <h1 className='text-2xl pb-10'>Post your article</h1>
      <TextField margin="normal" onChange={(e) => {setHeadLine(e.target.value)}} variant="standard" placeholder="Head line" />
      <TextField margin="normal" onChange={(e) => {setThumbnailImage(e.target.value)}} variant="standard" placeholder="Thumbnail url" />
      <TextField margin="normal" onChange={(e) => {setContent(e.target.value)}} variant="filled" placeholder="Content (markdown accepted)" multiline minRows={2} />
      <FormControl error={error} sx={{marginTop:2, marginBottom:3}} >
        <InputLabel id="selector">Topic Name:</InputLabel>
        <Select variant="standard" label="Topic" labelId="selector" value={topic}
         onChange={e => {setTopic(e.target.value)}} >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="general">General</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
          <MenuItem value="gaming">Gaming</MenuItem>
          <MenuItem value="weather">Weather</MenuItem>
          <MenuItem value="national">National</MenuItem>
          <MenuItem value="local">Local</MenuItem>
        </Select>
        {error && <p className="text-sm text-red-600 mt-2">Select a topic id</p>}
      </FormControl>
      <Button type='submit'>POST ARTICLE</Button>
    </form>
  </div>
  )
}

export default Posting;