import React, { useEffect, useState,useContext } from 'react';
import { Pagination } from '../Components/Pagination';
import { itemList } from '../mock_db';
import { Navbar } from '../Components/Navbar';
import { ItemList } from '../Components/ItemList';
import { CredentialContext } from '../Providers/Credentials';

const App = () => {
  const [items, setItems] = useState([]); // array of items
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const {userCredentials } = useContext(CredentialContext);

  const[randomItems,setRandomItems] = useState([]);
  const [currentPageRandom, setCurrentPageRandom] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePageChangeRandom = (pageNumber) => {
    setCurrentPageRandom(pageNumber);
  };
  useEffect(()=>{
    const userList=itemList.filter((item)=>item.has===userCredentials.email);
    setItems(userList);
    setRandomItems(itemList);
  },[])
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const pageCountRandom = Math.ceil(randomItems.length / itemsPerPage);

  return (
    <div className="app">
      <Navbar />
      <div className="content" style={{display:'flex', flexDirection:'column',height:'80%', justifyContent:'center'}}>
      <h2>Your Polls</h2>
      <div className="sidebar" style={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          
          <Pagination Direction={'Left'} currentPage={currentPage} onPageChange={handlePageChange} pageCount={pageCount} itemLength={pageCount} />

          <ItemList items={items} currentPage={currentPage} itemsPerPage={itemsPerPage} />
          <Pagination Direction={'Right'} currentPage={currentPage} onPageChange={handlePageChange} pageCount={pageCount} itemLength={pageCount} />

        </div>
        <hr style={{width:'85%'}}></hr>
        <h2>Random Polls</h2>

        <div className="sidebar" style={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
        <Pagination Direction={'Left'} currentPage={currentPageRandom} onPageChange={handlePageChangeRandom} pageCount={pageCountRandom} itemLength={pageCountRandom}/>

        <ItemList items={randomItems} currentPage={currentPageRandom} itemsPerPage={itemsPerPage} />
        <Pagination Direction={'Right'} currentPage={currentPageRandom} onPageChange={handlePageChangeRandom} pageCount={pageCountRandom} itemLength={pageCountRandom}/>
       </div>

      </div>
  </div>
);
};
export default App;