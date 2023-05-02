import React, { useState,useContext } from 'react';
import login from '../images/login.png';
import logo from '../images/logo.png';
import { accounts } from '../mock_db';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialContext } from '../Providers/Credentials';
import './Login.css';

import {addDoc,collection} from '@firebase/firestore';
import { fireStore } from '../firebase';

export default function LoginPage() {

  const [isLogin,setIsLogin]=useState(true);

  const navigation=useNavigate();
  
  const { loginFunction, userCredentials } = useContext(CredentialContext);


  return (
    <div className='background-pic'
      style={{ backgroundImage: `url(${login})` }}
    >
      <div className='login-logo'>
        <div className='first'>
          <img src={logo} alt="Logo" style={{ width: '100%' }} />
          <p>Votio !!</p>
        </div>
        {isLogin?<LoginArea setIsLogin={setIsLogin} navigation={navigation} loginFunction={loginFunction}/>:<SignUpArea setIsLogin={setIsLogin}/>}
      </div>
    </div>
  );
}

function LoginArea(props){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const ref=collection(fireStore,'userr');

  return(<div className='right-side'>
<div className='headline'>
  <h2>Welcome back!</h2>
</div>

<div>
<form className='form' onSubmit={(event)=>{
      event.preventDefault();
      let isValid=true;
      const user=accounts.find((u)=>(u.email===email));
      if(!user){
        alert('Email is not exist');
        isValid=false;
      }

      if(isValid && user?.password!==password){
        addDoc(ref,user).then((obj)=>{
          console.log(obj)
          
        });
        alert('Password is not correct');
        isValid=false;
      }

      if(isValid){
        //navigation !!!
        props.loginFunction({email,password});
        setTimeout(()=>{
          props.navigation('/main');

        },500);
      }
    }}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="example@mail.com" required onChange={(e)=>{setEmail(e.target.value)}}/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
     
      <button type="submit">Login</button>
      <div className='another-form'>
        <p>Do not have an account?</p>
      <Link type="button" className='link'
      onClick={()=>{
        props.setIsLogin(false);
      }}>Sign up</Link>

      </div>
    </form>
</div>
  </div>)
}

function SignUpArea(props){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');

  return(<div className='right-side'>
    <h2 className='headline'>Sign Up, Create Your First Poll</h2>
    <form className='form' onSubmit={(event)=>{
      event.preventDefault();
      let isValid=true;
      if(password!==confirm){
        alert('Password must be same');
        isValid=false;
      }
      const isExistMail=accounts.find((user)=>(user.email===email));
      if(isExistMail){
        alert('Email has already using');
        isValid=false;
      }
      if(isValid){
        accounts.push({email:email,password:password});
        alert('You have successfully signed up, you will redirected to the login page');
        setTimeout(()=>{
          props.setIsLogin(true);
        },700)
      }
    }}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" placeholder="example@mail.com" required onChange={(e)=>{setEmail(e.target.value)}}/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
      <label htmlFor="password">Confirm Password:</label>
      <input type="password" id="password" name="password" required onChange={(e)=>{setConfirm(e.target.value)}}/>
    
      <button type="submit">Sign Up</button>
      <div className='another-form'>
        <p >You already have an account?</p>
      <Link type="button" className='link'
      onClick={()=>{
        props.setIsLogin(true);
      }}>Login</Link>

      </div>
    </form>
  </div>)
}