import React, { useState } from 'react';
import './Item.css';
import ClipboardCopy from './Clipboard';
import open from '../images/open_white.png';

export default function Item(props) { 

  const { content, category,url } = props;

  return (
    <div className="item">
      
      <div className="content">{content}</div>
      <div className="category">{category}</div>
      <div className="actions" style={{display:'flex'}}>
      <ClipboardCopy copyText={url} />
      <div style={{display:'flex' ,flexDirection:'column'}}>
      
      <img className='open-button' src={open} style={{width:24, marginTop:'16px',padding:'5px'}} onClick={()=>{
        window.open(`https://${url}`,'_blank')
      }}>
      </img>
      <span style={{fontSize:'0.67em',paddingTop:17}}>Open</span>
      </div>
      </div>
    </div>
  );
}
