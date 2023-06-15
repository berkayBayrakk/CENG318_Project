import LoginPage from './Pages/Login';
import Landing from './Pages/Landing';
import {
    Route,
    Link,
    Routes
  } from 'react-router-dom'
import { CredentialProvider } from './Providers/Credentials';
import { useState } from 'react';
import CreatePoll from './Pages/CreatePoll/CreatePoll';
export default function App(){
 const  [number,setNumber]=useState(0)
    return (
    <div>
      <CredentialProvider>
          <Routes>
            <Route exact path="/" element={<LoginPage/>} />
            <Route path="/main" element={<Landing/>} />
            <Route path={`/poll:${number}`} element={<div>ASASASAS</div>} />
            <Route path="/create-poll" element={<CreatePoll/>}/>
          </Routes>
      </CredentialProvider>
         
    </div>)
}