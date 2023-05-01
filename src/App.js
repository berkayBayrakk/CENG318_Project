import LoginPage from './Pages/Login';
import Landing from './Pages/Landing';
import {
    Route,
    Link,
    Routes
  } from 'react-router-dom'
import { CredentialProvider } from './Providers/Credentials';
export default function App(){
    return (
    <div>
      <CredentialProvider>
          <Routes>
            <Route exact path="/" element={<LoginPage/>} />
            <Route path="/main" element={<Landing/>} />
          </Routes>
      </CredentialProvider>
         
    </div>)
}