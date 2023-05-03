import React, { useState } from 'react';
import './Item.css';
import ClipboardCopy from './Clipboard';
export default function Item(props) { 
  const [copySuccess, setCopySuccess] = useState(false);
  const { content, category } = props;

  const handleCopy = () => {
    navigator.clipboard.writeText('Copy Link Text');
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };

  return (
    <div className="item">
      <div className="content">{content}</div>
      <div className="category">{category}</div>
      <div className="actions" style={{display:'flex'}}>
      <ClipboardCopy copyText="https://google.sadascom" />

      </div>
    </div>
  );
}
