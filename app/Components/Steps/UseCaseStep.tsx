import React, { useState } from "react";
import Alert from "../Elements/Alert";
import UseCaseModal from "../Elements/UseCaseModal";

function UseCaseStep({ nextStep }: any) {
  const [loading, setLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);

  const data = [
    {
      actor: "Administrator",
      useCases: [
        "Can change layout leleadad  adadad  fafa d  afad  adcas   ",
        "Manage users",
        "Access dashboard",
      ],
    },
    {
      actor: "Test1",
      useCases: ["Can change layout", "Manage users", "Access dashboard"],
    },
    {
      actor: "Test2",
      useCases: ["Can change layout", "Manage users", "Access dashboard"],
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/actionUseCaseMock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requirements: "Test" }),
      });

      const data = await response.json();
      console.log("Actors: ", data.response.names);
      nextStep();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (useCase: string) => {
    setSelectedUseCase(useCase);
    setIsPopupOpen(true);
  };

  return (
    <div className="flex flex-col gap-4 w-3/5">
      <label
        htmlFor="message"
        className="block text-xl font-medium text-gray-900 dark:text-white"
      >
        Identified Use Cases
      </label>
      <div className="relative">
        <div
          className={`p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-[24rem] max-h-[37rem] overflow-y-auto`}
        >
          <div className="relative overflow-x-auto w-full">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Actor
                  </th>
                  <th scope="col" className="px-6 py-3">
                    UseCase
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.useCases.map((useCase, useCaseIndex) => (
                      <tr
                        key={useCaseIndex}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      >
                        {useCaseIndex === 0 && (
                          <th
                            scope="row"
                            rowSpan={item.useCases.length}
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item.actor}
                          </th>
                        )}
                        <td className="px-6 py-4">{useCase}</td>
                        <td className="px-6 py-4">
                          <a
                            href="#"
                            onClick={() => handleEditClick(useCase)}
                            className="font-medium text-blue-700 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Loading alert */}
          {loading && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-gray-100 bg-opacity-50">
              <Alert message="use cases" />
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 hover:text-blue-700"
          } rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
        >
          {loading ? "Processing..." : "Next"}
        </button>
      </div>
      {isPopupOpen && (
        <UseCaseModal
          setIsPopupOpen={setIsPopupOpen}
          value={selectedUseCase}
        />
      )}
    </div>
  );
}

export default UseCaseStep;
