import React, { useState, useRef, useEffect } from 'react';

interface Props {
  text: string;
  author: string;
  date: string;
}

function GreyBox({ text, author, date }: Props) {
  const [boxHeight, setBoxHeight] = useState<number | undefined>(undefined);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the height of the text and set the height of the box accordingly
    if (boxRef.current) {
      setBoxHeight(boxRef.current.scrollHeight);
    }
  }, [text]);

  return (
    <>

    <div style={{ height: boxHeight, display: 'flex', flexDirection:'column', 
    background: '#E5E7EB', borderRadius: '0px 8px 8px 8px', maxWidth: '50%', alignItems: 'flex-start', marginLeft: '8px', marginBottom: '12px' }}>
      <div ref={boxRef} style={{marginLeft: '4px'}}>
        <div style={{fontWeight: '600', marginBottom: '4px', marginTop: '4px', textAlign: 'left'}}>{author}</div>
            {text}
            <div style={{fontWeight: '400px', fontSize: '15px', textAlign: 'right', marginBottom: '4px', marginRight: '4px'}}>{date}</div>
        </div>
    </div>
    </>
  );
}

export default GreyBox;
