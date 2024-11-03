import Chat from "../Elements/Chat";
import Accordion from "../Elements/Accordion";
import ImageModel from "../Elements/ImageModel";
import Alert from "../Elements/Alert";
import { useState } from "react";
import UseCaseTitleList from "../Elements/UseCaseTitleList";
import { useNavigate } from "@remix-run/react";

function ModelStep({
  modelURL,
  useCaseDescriptions,
  plantUML,
  setModelURL,
  setUseCaseDescriptions,
  setPlantUML,
  requirements,
  useCase,
}: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [showWhiteCard, setShowWhiteCard] = useState(false);
  const [currentIndex, setCurrentIndex] = useState();
  const [selectedUseCase, setSelectedUseCase] = useState({
    title: "Did not find UseCase Title",
    description: "Description of the first use case.",
    actors: ["Actor1", "Actor2"],
    steps: ["Step1", "Step2"],
  });

  const navigate = useNavigate();

  const regenerate = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/Model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requirements: requirements,
          relationships: useCase,
        }),
      });

      const llmAnswer = await response.json();
      setModelURL(llmAnswer.model_url);
      setUseCaseDescriptions(llmAnswer.json_object);
      setPlantUML(llmAnswer.plantUML);
    } catch (error) {
      console.error("Error:", error);
      navigate("/something-went-wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTitleClick = (useCase: any, index: any) => {
    setShowWhiteCard(true);
    setSelectedUseCase(useCase);
    setCurrentIndex(index + 1);
  };
  return (
    <div className="relative mx-16 w-full flex divide-x divide-double h-[65vh]">
      <div className="flex mx-16 w-full divide-x divide-double h-[65vh]">
        <div className="flex flex-col justify-between w-1/2 p-4 min-h-96">
          <div className="flex-grow bg-white shadow-lg rounded-lg p-4 max-h-min">
            <Chat
              plantUML={plantUML}
              useCaseDescriptions={useCaseDescriptions}
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
                UC{currentIndex}: {selectedUseCase.title}
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
                onTitleClick={(useCase: any, index: any) =>
                  handleTitleClick(useCase, index)
                }
              />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center w-1/2 p-4">
          <ImageModel source={modelURL} />
          <div className="w-full flex justify-evenly pt-8">
            <button
              type="button"
              onClick={regenerate}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              style={{ width: "200px", height: "40px", marginRight: "8px" }}
            >
              Re-Generate
            </button>
            <button
              type="button"
              className="text-white bg-gray-400 cursor-not-allowed font-medium rounded-lg text-sm text-center"
              style={{ width: "200px", height: "40px" }}
              disabled
            >
              Export
            </button>
          </div>
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
