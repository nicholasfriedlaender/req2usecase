import Chat from "../Elements/Chat";
import Accordion from "../Elements/Accordion";
import ImageModel from "../Elements/ImageModel";
import Alert from "../Elements/Alert";
import { useState } from "react";

function ModelStep({
  modelURL,
  useCaseDescription,
  plantUML,
  setModelURL,
  setUseCaseDescription,
  setPlantUML,
}: any) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="relative flex w-11/12 divide-x divide-double h-[65vh]">
      <div className="flex w-11/12 divide-x divide-double h-[65vh]">
        <div className="flex flex-col justify-between w-1/2 p-4 min-h-96">
          <div className="flex-grow bg-white shadow-lg rounded-lg p-4 max-h-min">
            <Chat
              plantUML={plantUML}
              useCaseDescription={useCaseDescription}
              setModelURL={setModelURL}
              setUseCaseDescription={setUseCaseDescription}
              setPlantUML={setPlantUML}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className="bg-white shadow-lg rounded-lg mt-4 p-4 h-max overflow-y-auto">
            <h2 className="text-lg font-semibold mt-4 mb-2">
              UseCase Description
            </h2>
            <Accordion useCaseDescription={useCaseDescription} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 p-4">
          <ImageModel source={modelURL} />
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <Alert message="request" />
        </div>
      )}
    </div>
  );
}

export default ModelStep;
