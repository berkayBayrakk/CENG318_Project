import React, { useState } from 'react';
import login from './images/login.png';
import logo from './images/logo.png';
import { accounts } from './mock_db';
import { Link, useNavigate } from 'react-router-dom';
export default function LoginPage() {

  const [isLogin,setIsLogin]=useState(true);

  const navigation=useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: 'cover',
       
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '50%',
          backgroundColor: 'white',
          padding: '50px',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ flex: 1 }}>
          <img src={logo} alt="Logo" style={{ width: '100%' }} />
          <p style={{ marginTop: '50px', fontSize: '24px' }}>Fast Poll !!</p>
        </div>
        {isLogin?<LoginArea setIsLogin={setIsLogin} navigation={navigation}/>:<SignUpArea setIsLogin={setIsLogin}/>}
      </div>
    </div>
  );
}

function LoginArea(props){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  return(<div style={{ flex: 1 }}>
<div style={{
display:'flex',
justifyContent:'center',
marginBottom:'140px'
}}>

  <h2 style={{
      
    }}>Welcome back!</h2>
</div>

<div>
<form style={{ display: 'flex', flexDirection: 'column', } } onSubmit={(event)=>{
      event.preventDefault();
      let isValid=true;
      const user=accounts.find((u)=>(u.email===email));
      if(!user){
        alert('Email is not exist');
        isValid=false;
      }
      if(isValid && user?.password!==password){
        alert('Password is not correct');
        isValid=false;
      }

      if(isValid){
        //navigation !!!
        props.navigation('/main');
      }
    }}>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" required onChange={(e)=>{setEmail(e.target.value)}}/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
     
      <button type="submit">Login</button>
      <div 
      style={{
        flexDirection:'row',
        display:'flex',
        alignItems:'center'
      }}>
        <p>Do not have an account</p>
      <Link type="button" 
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

  return(<div style={{ flex: 1 }}>
    <h2 style={{
      display:'flex',
      justifyContent:'center',
      marginBottom:'140px'
    }}>Sign Up, Create Your First Poll</h2>
    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(event)=>{
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
      <input type="email" id="email" name="email" required onChange={(e)=>{setEmail(e.target.value)}}/>
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" required onChange={(e)=>{setPassword(e.target.value)}}/>
      <label htmlFor="password">Confirm Password:</label>
      <input type="password" id="password" name="password" required onChange={(e)=>{setConfirm(e.target.value)}}/>
    
      <button type="submit">Sign Up</button>
      <div 
      style={{
        flexDirection:'row',
        display:'flex',
        alignItems:'center'
      }}>
        <p >You have already have an account</p>
      <Link type="button"
      onClick={()=>{
        props.setIsLogin(true);
      }}>Login</Link>

      </div>
    </form>
  </div>)
}