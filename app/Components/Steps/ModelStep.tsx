
import React from "react";
import Chat from "../Elements/Chat";
import Accordion from "../Elements/Accordion";
import ImageModel from "../Elements/ImageModel";

function ModelStep() {
  return (
    <div className="flex w-11/12 divide-x divide-double h-3/4">
      <div className="flex flex-col justify-between w-1/2 p-4 min-h-96">
        <div className="flex-grow bg-white shadow-lg rounded-lg p-4 max-h-min">
          <Chat />
        </div>
        <div className="bg-white shadow-lg rounded-lg mt-4 p-4 h-max overflow-y-auto">
          <h2 className="text-lg font-semibold mt-4 mb-2">
            Use Case Description
          </h2>
          <Accordion />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4 w-1/2 p-4 min-h-96">
        <ImageModel />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Download UseCase
        </button>
      </div>
    </div>
  );
}

export default ModelStep;
