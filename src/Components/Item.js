import React, { useState } from 'react';
import './Item.css';

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
      <div className="actions">
        <div className="copy-link" onClick={handleCopy}>
          {copySuccess ? 'Copied!' : 'Copy Link'}
        </div>
        <button className="copy-button" onClick={handleCopy}>
          <i className="fas fa-copy"></i>
        </button>
      </div>
    </div>
  );
}
