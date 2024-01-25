'use client'
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

function Youtube() {
    return (
        <div  className='hidden sm:grid sm:place-items-center'>
        <ReactPlayer url='https://www.youtube.com/watch?si=2PIRF9IlCCax4Zm-&v=f-iVZG7Xbuk&feature=youtu.be' />
      </div>
    );
  }

export default Youtube