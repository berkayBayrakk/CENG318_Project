import Avatar from '../images/avatar.png';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect,useContext, useState } from 'react';
import {CredentialContext} from '../Providers/Credentials';
import Logo from '../images/votio_logo_white.png';
import './Navbar.css';

export const Navbar = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const { logoutFunction, userCredentials } = useContext(CredentialContext);

    const navigation=useNavigate();

    const handleSearch = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  
    const handleCreate = () => {
      // Handle create button click
    };
  
    const handleHelp = () => {
      // Handle help menu item click
    };
  
    const handleLogout = () => {
      logoutFunction();
       navigation('/'); 
    };

    useEffect(()=>{
      console.log(userCredentials);

      if(!userCredentials.isLogged){
        navigation('/');
      }
    },[])
  
    return (
      <nav className="navbar">
        <div className="navbar-left">
          <img src={Logo} alt="Logo" className="navbar-logo" />
        </div>
        <div className="navbar-search">
            <input type="text" placeholder="Search Poll" value={searchQuery} onChange={handleSearch} />
        </div>
        <div className="navbar-right">
          <button className="navbar-create" onClick={handleCreate}>
            Create a New Poll
          </button>
          <div className="navbar-avatar">
            <img src={Avatar} alt="Avatar" className="navbar-avatar-img" />
            <div className="navbar-avatar-menu">
              <ul style={{listStyleType:'none'}}>
              <li >{userCredentials.email}</li>
                <li onClick={handleHelp}>Help</li>
                <li onClick={handleLogout}>Logout</li>

              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  };

  