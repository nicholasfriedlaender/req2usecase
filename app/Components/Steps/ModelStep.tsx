import React from "react";
import Chat from "../Elements/Chat";
import Accordion from "../Elements/Accordion";
import ImageModel from "../Elements/ImageModel";

function ModelStep({ modelURL, useCaseDescription }: any) {
  return (
    <div className="flex w-11/12 divide-x divide-double h-[65vh]">
      <div className="flex flex-col justify-between w-1/2 p-4 min-h-96">
        <div className="flex-grow bg-white shadow-lg rounded-lg p-4 max-h-min">
          <Chat />
        </div>
        <div className="bg-white shadow-lg rounded-lg mt-4 p-4 h-max overflow-y-auto">
          <h2 className="text-lg font-semibold mt-4 mb-2">
            UseCase Description
          </h2>
          <Accordion useCaseDescription={useCaseDescription}/>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 p-4"> 
        <ImageModel source={modelURL} />
      </div>
    </div>
  );
}

export default ModelStep;
