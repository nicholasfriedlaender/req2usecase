import React from 'react'

function ImageModel({source}:any) {
  return (
    <div className="w-full p-4 rounded-lg shadow-xl bg-white">
      <img
        className="h-auto w-full dark:shadow-gray-800"
        src={source}
        alt="Use Case Diagram"
      />
    </div>
  );
}

export default ImageModel