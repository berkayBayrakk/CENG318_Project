import React, { useState } from 'react';
import './Item.css';
import ClipboardCopy from './Clipboard';
export default function Item(props) { 

  const { content, category,url } = props;

  return (
    <div className="item">
      
      <div className="content">{content}</div>
      <div className="category">{category}</div>
      <div className="actions" style={{display:'flex'}}>
      <ClipboardCopy copyText={url} />
      </div>
    </div>
  );
}
