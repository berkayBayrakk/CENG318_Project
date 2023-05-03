import React, { useState } from 'react';
import CopyImage from '../images/copy-text.png';

export default function ClipboardCopy({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);
  
    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    // onClick handler function for the copy button
    const handleCopyClick = () => {
      // Asynchronously call copyTextToClipboard
      copyTextToClipboard(copyText)
        .then(() => {
          // If successful, update the isCopied state value
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    return (
      <div style={{display:'flex'}}>
        <input type="text" value={copyText} readOnly />
        {/* Bind our handler function to the onClick button property */}
        <div >
        <button style={{padding:0}}>
            <div onClick={handleCopyClick} style={{display:'flex' ,width:30,height:30}}>
                <img src={CopyImage}>
                </img>
            </div>
            
        </button>
       
        </div>
      </div>
    );
  }