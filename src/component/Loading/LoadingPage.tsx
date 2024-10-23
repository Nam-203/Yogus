import Image from 'next/image';
import React from 'react'

const LoadingPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen w-full">
          <Image
            src="/icons/loading-circle.svg"
            alt="Loading..."
            width={50}
            height={50}
          />
        </div>
      );
    
}

export default LoadingPage