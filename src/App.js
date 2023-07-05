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
import { PollPage } from './Pages/PollPage/PollPage';
import HelpPage from './Pages/Help';
export default function App(){

    return (
    <div>
      <CredentialProvider>
          <Routes>
            <Route exact path="/" element={<LoginPage/>} />
            <Route path="/main" element={<Landing/>} />
            <Route path="/help" element={<HelpPage/>} />

            <Route path="/poll/:pollID" element={<PollPage/>} />
            <Route path="/create-poll" element={<CreatePoll/>}/>
          </Routes>
      </CredentialProvider>
         
    </div>)
}