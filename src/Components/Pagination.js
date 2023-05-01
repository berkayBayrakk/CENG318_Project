import Left from '../images/left_pagination.png';
import Right from '../images/right_pagination.png';

export const Pagination = ({ Direction, onPageChange, pageCount, currentPage,itemLength }) => {
    const style=(Direction==='Left')?
    {display:((currentPage===1 && Direction==='Left')||(currentPage===itemLength && Direction==='Right'))?'none':'flex',width:100,height:100 ,position:'absolute',
    left:0
    }:{display:((currentPage===1 && Direction==='Left')||(currentPage===itemLength && Direction==='Right'))?'none':'flex',width:100,height:100 ,position:'absolute',
    right:0}
  
    const handlePageClick = (pageNumber) => {
      onPageChange(pageNumber);
    };
  
    return (
      <div style={{width:100 ,height:100}} >
      <img alt='Pagination' src={(Direction==='Left')?Left:Right} 
     onClick={()=>{
        if(Direction==='Left' &&(currentPage!==1)){
          handlePageClick(currentPage-1);
        }
        else{
          handlePageClick(currentPage+1);
  
        }
      }}
      style={style}></img>
      </div>
    );
  };