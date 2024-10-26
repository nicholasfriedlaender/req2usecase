import Chat from "../Elements/Chat";
import Accordion from "../Elements/Accordion";
import ImageModel from "../Elements/ImageModel";
import Alert from "../Elements/Alert";
import { useState } from "react";
import UseCaseTitleList from "../Elements/UseCaseTitleList";

function ModelStep({
  modelURL,
  useCaseDescriptions,
  plantUML,
  setModelURL,
  setUseCaseDescriptions,
  setPlantUML,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [showWhiteCard, setShowWhiteCard] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState({
    title: "Did not find UseCase Title",
    description: "Description of the first use case.",
    actors: ["Actor1", "Actor2"],
    preconditions: ["Precondition1", "Precondition2"],
    postconditions: ["Postcondition1", "Postcondition2"],
  });

  const handleTitleClick = (useCase: any) => {
    setShowWhiteCard(true);
    setSelectedUseCase(useCase);
  };
return (
  <div className="relative flex w-11/12 divide-x divide-double h-[65vh]">
    <div className="flex w-11/12 divide-x divide-double h-[65vh]">
      <div className="flex flex-col justify-between w-1/2 p-4 min-h-96">
        <div className="flex-grow bg-white shadow-lg rounded-lg p-4 max-h-min">
          <Chat
            plantUML={plantUML}
            useCaseDescription={useCaseDescriptions}
            setModelURL={setModelURL}
            setUseCaseDescriptions={setUseCaseDescriptions}
            setPlantUML={setPlantUML}
            setIsLoading={setIsLoading}
          />
        </div>

        {showWhiteCard ? (
          <div className="bg-white shadow-lg rounded-lg mt-4 p-4 h-max overflow-y-auto relative">
            <button
              type="button"
              className="absolute top-2 right-2 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
              aria-label="Close"
              onClick={() => setShowWhiteCard(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>

            <h2 className="text-xl ml-1 mb-5 font-bold">
              {selectedUseCase.title}
            </h2>
            <Accordion useCaseDescriptions={selectedUseCase} />
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-lg mt-4 p-4 h-max overflow-y-auto">
            <h2 className="text-lg font-semibold mt-4 mb-2">
              UseCase Descriptions
            </h2>
            <UseCaseTitleList
              useCaseDescriptions={useCaseDescriptions}
              onTitleClick={(useCase: any) => handleTitleClick(useCase)}
            />
          </div>
        )}
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
