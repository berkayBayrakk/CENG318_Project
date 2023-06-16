import Item from "./Item";

export const ItemList = ({ items, currentPage, itemsPerPage }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = items.slice(startIndex, endIndex);
  
    return (
      <div style={{
      display:'flex',
      }}>
        {currentItems.map((item) => (
          <Item content={item.name} category={item.category} url={item.url}/>
        ))}
      </div>
    );
  };