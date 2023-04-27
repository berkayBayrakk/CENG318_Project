import LoginPage from './Login';
import {
    Route,
    Link,
    Routes
  } from 'react-router-dom'
export default function App(){
    return (
    <div>
 <Routes>
            <Route exact path="/" element={<LoginPage/>} />
            <Route path="/main" element={<div>asdasdasdas</div>} />
          </Routes>
    </div>)
}