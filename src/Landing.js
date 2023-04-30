import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Item from './Item';
import Avatar from './images/avatar.png';
import Left from './images/left_pagination.png';
import Right from './images/right_pagination.png'
import { itemList } from './mock_db';

const Navbar = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
  
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
      // Handle logout menu item click
    };
  
    return (
      <nav className="navbar">
        <div className="navbar-left">
          <img src="logo.png" alt="Logo" className="navbar-logo" />
          <div className="navbar-search">
            <input type="text" placeholder="Search Poll" value={searchQuery} onChange={handleSearch} />
          </div>
          <button className="navbar-create" onClick={handleCreate}>
            Create a New Poll
          </button>
        </div>
        <div className="navbar-right">
          <div className="navbar-avatar">
            <img src={Avatar} alt="Avatar" className="navbar-avatar-img" />
            <div className="navbar-avatar-menu">
              <ul>
                <li onClick={handleHelp}>Help</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    );
  };



const ItemList = ({ items, currentPage, itemsPerPage }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <div style={{
    display:'flex'
    }}>
      {currentItems.map((item) => (
        <Item content={item.content} category={item.category}/>
      ))}
    </div>
  );
};

const Pagination = ({ Direction, onPageChange, pageCount, currentPage,itemLength }) => {
  const style=(Direction==='Left')?
  {display:((currentPage===1 && Direction==='Left')||(currentPage===itemLength && Direction==='Right'))?'none':'flex',width:100,height:100 ,position:'absolute',
  left:0
  }:{display:((currentPage===1 && Direction==='Left')||(currentPage===itemLength && Direction==='Right'))?'none':'flex',width:100,height:100 ,position:'absolute',
  right:0}
  const pageNumbers = Array.from({ length: pageCount}, (_, i) => i + 1);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div style={{width:100 ,height:100}} onClick={()=>{
      if(Direction==='Left'){
        handlePageClick(currentPage-1);
      }
      else{
        handlePageClick(currentPage+1);

      }
    }}>
    <img alt='Pagination' src={(Direction==='Left')?Left:Right} 
   
    style={style}></img>
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState([]); // array of items
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(()=>{
    setItems(itemList);
  },[])
  const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="app">
      <Navbar />
      <div className="content" style={{display:'flex', flexDirection:'column',height:'80%', justifyContent:'center'}}>
        
      <div className="sidebar" style={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <Pagination Direction={'Left'} currentPage={currentPage} onPageChange={handlePageChange} pageCount={pageCount} itemLength={pageCount} />

          <ItemList items={items} currentPage={currentPage} itemsPerPage={itemsPerPage} />
          <Pagination Direction={'Right'} currentPage={currentPage} onPageChange={handlePageChange} pageCount={pageCount} itemLength={pageCount} />

        </div>
        <hr style={{width:'85%'}}></hr>
        <div className="sidebar" style={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Pagination Direction={'Left'} currentPage={currentPage} onPageChange={handlePageChange} pageCount={pageCount} itemLength={pageCount}/>

        <ItemList items={items} currentPage={currentPage} itemsPerPage={itemsPerPage} />
        <Pagination Direction={'Right'} currentPage={currentPage} onPageChange={handlePageChange} pageCount={pageCount} itemLength={pageCount}/>
       </div>

      </div>
  </div>
);
};
export default App;