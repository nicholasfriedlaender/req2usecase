import React from "react";
import Chat from "../Elements/Chat";
import Accordion from "../Elements/Accordion";

function ModelStep() {
  return (
    <div className="flex w-11/12 divide-x divide-double h-3/4">
      <div className="flex flex-col justify-between w-1/2 p-4 min-h-96">
        <div className="flex-grow bg-white shadow-lg rounded-lg p-4 max-h-44">
          {" "}
          {/* Added overflow-y-auto here */}
          <Chat />
        </div>
        <div className="bg-white shadow-lg rounded-lg mt-4 p-4 max-h-44 overflow-y-auto max-h-max">
          {" "}
          {/* Added overflow-y-auto here */}
          <h2 className="text-lg font-semibold mt-4 mb-2">
            Use Case Description
          </h2>
          <Accordion />
        </div>
      </div>
      <div className="flex items-center justify-center w-1/2 p-4 min-h-96">
        <div className="text-3xl font-bold">02</div>
      </div>
    </div>
  );
}

export default ModelStep;
