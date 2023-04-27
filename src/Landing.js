import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Item from './Item';
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
            <img src="avatar.png" alt="Avatar" className="navbar-avatar-img" />
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

const Pagination = ({ currentPage, onPageChange, pageCount }) => {
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <ul className="pagination">
      {pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </li>
      ))}
    </ul>
  );
};

const ItemList = ({ items, currentPage, itemsPerPage }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  return (
    <div style={{
    
    }}>
      {currentItems.map((item) => (
        <Item content={item.content} category={item.category}/>
      ))}
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState([]); // array of items
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(()=>{
    setItems(itemList);
    console.log(12);
  },[])
  const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="sidebar">
          <ItemList items={items} currentPage={currentPage} itemsPerPage={itemsPerPage} />
          <Pagination currentPage={currentPage} onPageChange={handlePageChange} pageCount={pageCount} />
        </div>
        <div className="sidebar">
      <ItemList items={items} currentPage={currentPage} itemsPerPage={itemsPerPage} />
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} pageCount={pageCount} />
    </div>
  </div>
</div>
);
};
export default App;