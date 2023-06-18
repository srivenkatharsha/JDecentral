import React from 'react';
import { Button, TextField, CircularProgress, Alert } from '@mui/material';
import '../App.css';
import WelcomeText from '../components/WelcomeText';
import { useState , useEffect} from 'react';
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom';
import {storeSession,checkUser, checkJournalist, clearSession} from '../utils/management'

const delay = ms => new Promise(res => setTimeout(res, ms));


const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [progress, setProgress] = useState("Log In");
  const [errorStatus, setErrorStatus] = useState(false);
  const handleLogin = async (e) => {
    setErrorStatus(false);
    setProgress(<CircularProgress />);
    e.preventDefault();
    let baseUrl = "http://localhost:3000/loginAccount";
    const response = await axios.post(baseUrl, { userName: userName, password: password });
    const data = response.data;
    if (data['isSuccess']) {
      storeSession(userName,(await axios.post("http://localhost:3000/journalistStatus",{userName : userName})).data);
      setProgress("Log In");
      navigate("/");
    }
    else {
      setProgress("Log In");
      setErrorStatus(true);
      await delay(5000);
      setErrorStatus(false);
    }
  }

  return (
    <>
      <div className="h-full w-full flex flex-row max-md:flex-col background">
        <div className="flex basis-2/4 bg-transparent justify-center align-middle my-auto">
          <WelcomeText />
        </div>
        <div className="flex basis-2/4 justify-center align-middle bg-transparent">
          <form onSubmit={handleLogin} className="flex flex-col justify-evenly p-12 backdrop-blur-md bg-white/75
          align-middle h-3/5 w-3/5 max-md:w-4/5 max-sd:w-full my-auto rounded-xl mx-auto">
            <p className="text-2xl font-bold center select-none">Login</p>
            <TextField id="login_username" value={userName} onChange={e => setUserName(e.target.value)} variant="standard" placeholder="Username" />
            <TextField error={errorStatus} helperText={(errorStatus) ? "Incorrect username or password" : ""} id="login_password" value={password} onChange={e => setPassword(e.target.value)} variant="standard" placeholder="Password" type='password' />
            <Button type="submit" disabled={!(progress === "Log In")} >{progress}</Button>
            <Link to="/signup" className='text-blue-700	hover:cursor-pointer select-none'>Create an account</Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login;