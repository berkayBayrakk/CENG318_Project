import React, { useEffect, useState } from 'react';
import { Pagination } from '../Components/Pagination';
import { itemList } from '../mock_db';
import { Navbar } from '../Components/Navbar';
import { ItemList } from '../Components/ItemList';


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