import React, { useState } from 'react';
// import CopyImage from '../images/copy-text.png';
import CopyImage from '../images/copy-svgrepo-com.svg';
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
      copyTextToClipboard(`https://${copyText}`)
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
      <div style={{display:'flex' ,height:120}}>
           
        {/* Bind our handler function to the onClick button property */}
            <div style={{display:'flex',alignItems:'center',flexDirection:'column',height:80}}>
                <button style={{padding:0,height:22}}>
                    <div onClick={handleCopyClick} style={{display:'flex' ,width:30,height:30}}>
                        <img src={CopyImage}/>
                    </div>
                    
                </button>
                <div style={{margin:2,padding:2}}>
                <h6 style={{margin:0,padding:0}}>
                    {(isCopied)?'Copied':'Copy'}
                </h6>
                </div>
            
            </div>
      </div>
    );
  }