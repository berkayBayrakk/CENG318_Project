import React, { useEffect, useState, useContext, useRef } from 'react';
import { Pagination } from '../Components/Pagination';
import { itemList } from '../mock_db';
import { Navbar } from '../Components/Navbar';
import { ItemList } from '../Components/ItemList';
import { CredentialContext } from '../Providers/Credentials';
import { getPolls } from '../firebase';
import dice from '../images/dice.png';
import './Landing.css';
function shuffleList(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}
const App = () => {

  const [searchQuery, setSearchQuery] = useState('');


  const [itemsPerPage, setItemsPerPage] = useState(null);

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width > 1200) {
      setItemsPerPage(4);
    } else if (width > 900 && width <= 1200) {
      setItemsPerPage(3);
    } else if (width > 660 && width <= 900) {
      setItemsPerPage(2);
    } else if (width <= 660) {
      setItemsPerPage(1);
    }
  };

  useEffect(() => {
    updateItemsPerPage();

    const handleResize = () => {
      updateItemsPerPage();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const [items, setItems] = useState([]); // array of items
  const [currentPage, setCurrentPage] = useState(1);
  const {userCredentials } = useContext(CredentialContext);
  const [polls,setPolls]=useState([]);
  const[randomItems,setRandomItems] = useState([]);
  const [currentPageRandom, setCurrentPageRandom] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePageChangeRandom = (pageNumber) => {
    setCurrentPageRandom(pageNumber);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{ 
    const fetchPoll= async () => {
      return await getPolls()
    }
    fetchPoll().then((polls)=>{
      setPolls(polls);
      const userList=(polls.filter((item)=>item.creatorID===userCredentials.id)).map((element)=>
      {return {...element,url:`${window.location.hostname}/poll/${element.id}`}}
    );
    const randomList=polls.map((element)=>{
      return {...element,url:`${window.location.hostname}/poll/${element.id}`}
    });
    shuffleList(randomList)
    setItems(userList);
    setRandomItems(randomList);
    });
   
  },[]);

  useEffect(()=>{
    console.log(polls)
    const userList=(polls.filter((item)=>(item.creatorID===userCredentials.id && item.name.includes(searchQuery)))).map((element)=>
      {return {...element,url:`${window.location.hostname}/poll/${element.id}`}}
    );
    const randomList=(polls.filter((item)=>item.name.includes(searchQuery))).map((element)=>
    {return {...element,url:`${window.location.hostname}/poll/${element.id}`}}
  );
    shuffleList(randomList)
    setItems(userList);
    setRandomItems(randomList);
  },[searchQuery])

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const pageCountRandom = Math.ceil(randomItems.length / itemsPerPage);

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <div className="content" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <div>
      <h2>Your Polls</h2>
        
        
      </div>
      <div className="sidebar" style={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'center',height:'240px',marginLeft:'10px'}}>
          
          <Pagination Direction={'Left'} currentPage={currentPage} onPageChange={handlePageChange} pageCount={pageCount} itemLength={pageCount} />

          <ItemList items={items} currentPage={currentPage} itemsPerPage={itemsPerPage} />
          <Pagination Direction={'Right'} currentPage={currentPage} onPageChange={handlePageChange} pageCount={pageCount} itemLength={pageCount} />

        </div>
        <hr style={{width:'85%'}}></hr>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <h2>Random Polls</h2>
        <img className='dice'  src={dice} style={{width:40,height:40,marginLeft:'15px'}} onClick={()=>{
             const randomList=(polls.filter((item)=>item.name.includes(searchQuery))).map((element)=>
             {return {...element,url:`${window.location.hostname}/poll/${element.id}`}}
           );
           shuffleList(randomList);
           setRandomItems(randomList);
        }}>
        
        </img>
        </div>

        <div className="sidebar" style={{display:'flex', flexDirection:'row',alignItems:'center',justifyContent:'center',marginLeft:'10px'}}>
        <Pagination Direction={'Left'} currentPage={currentPageRandom} onPageChange={handlePageChangeRandom} pageCount={pageCountRandom} itemLength={pageCountRandom}/>

        <ItemList items={randomItems} currentPage={currentPageRandom} itemsPerPage={itemsPerPage} />
        <Pagination Direction={'Right'} currentPage={currentPageRandom} onPageChange={handlePageChangeRandom} pageCount={pageCountRandom} itemLength={pageCountRandom}/>
       </div>

      </div>
  </div>
);
};
export default App;