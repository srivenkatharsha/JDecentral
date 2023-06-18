import React, { useState } from 'react';
import { Button, TextField, Checkbox, CircularProgress } from '@mui/material';
import WelcomeText from '../components/WelcomeText';
import axios from "axios";
import '../App.css';
import {Link, useNavigate} from 'react-router-dom';

const delay = ms => new Promise(res => setTimeout(res, ms));

const Signup = () => {
  const navigate = useNavigate();
  const[userName, setUserName] = useState("");
  const[password, setPassword] = useState("");
  const[checked, setChecked] = useState(false);
  const [progress, setProgress] = useState("Sign Up");
  const [errorStatus, setErrorStatus] = useState(false);
  const handleSignup = async e => {
    e.preventDefault();
    setErrorStatus(false);
    setProgress(<CircularProgress />);
    let baseUrl = "http://localhost:3000/createAccount";
    const response = await axios.post(baseUrl, { userName: userName, password: password , isJournalist : checked});
    const data = response.data;
    if(data['isSuccess']){
      //todo
      console.log("created!");
      setProgress("Sign Up");
      navigate("/login");
    }
    else{
      setProgress("Sign Up");
      setErrorStatus(true);
      // todo
      console.log('already exists');
      await delay(5000);
      setErrorStatus(false);
    }
  }

  return (
    <div className="h-full w-full flex flex-row max-md:flex-col max-md:flex-nowrap background">
      <div className="flex basis-2/4 bg-transparent justify-center align-middle my-auto">
          <WelcomeText />
        </div>
      <div className="flex basis-2/4 justify-center align-middle bg-transparent">
        <form onSubmit={handleSignup} className="flex flex-col justify-evenly p-12 backdrop-blur-md bg-white/75
        align-middle h-3/4 w-3/5 max-md:w-4/5 max-sd:w-full rounded-xl my-auto">
          <p className="text-2xl font-bold center select-none">Sign up</p>
          <TextField id="signup_username"  onChange={e => setUserName(e.target.value)} variant="standard" placeholder="Username" />
          <TextField error={errorStatus} helperText={(errorStatus) ? "Account already exists!" : ""} id="login_password" value={password} onChange={e => setPassword(e.target.value)} variant="standard" placeholder="Password" type='password' />
          <div className="flex flex-row align-baseline">
            <Checkbox onClick={(event) => {setChecked(event.target.checked)}} label="journalist" />
            <span className="my-auto select-none">Are you a journalist?</span>
          </div>
          <Button type='submit'>{progress}</Button>
          <Link to="/login" className='text-blue-700 hover:cursor-pointer select-none'>Login to your account</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup;