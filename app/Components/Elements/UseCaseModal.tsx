import React, { useState } from "react";

function UseCaseModal({ setIsPopupOpen, value, onUpdate }: any) {
  const [tempUseCases, setTempUseCases] = useState(value);

  // Handle the change in input for a specific use case
  const handleChange = (index: number, newValue: string) => {
    const updatedUseCases = [...tempUseCases];
    updatedUseCases[index] = newValue;
    setTempUseCases(updatedUseCases);
  };

  // Handle the deletion of a specific use case
  const handleDelete = (index: number) => {
    const updatedUseCases = tempUseCases.filter((_: any, i: any) => i !== index);
    setTempUseCases(updatedUseCases);
  };

  // Handle the addition of a new empty use case
  const handleAdd = () => {
    setTempUseCases([...tempUseCases, ""]);
  };

  // Save changes to the parent component
  const handleSave = () => {
    onUpdate(tempUseCases);
    setIsPopupOpen(false);
  };

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 flex items-center bg-black bg-opacity-50 justify-center z-40"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit UseCases
            </h3>
            <button
              type="button"
              onClick={() => setIsPopupOpen(false)}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
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
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4 md:p-5">
            {tempUseCases.map((useCase: string, index: number) => (
              <div className="mb-4 flex items-center" key={index}>
                <input
                  value={useCase}
                  type="text"
                  id={`useCase-${index}`}
                  autoComplete="off"
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Use Case Description"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleDelete(index)}
                  className="ml-2 text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            ))}

            {/* Add new use case button */}
            <button
              type="button"
              onClick={handleAdd}
              className="w-full text-white inline-flex items-center justify-center bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 mb-4"
            >
              Add UseCase
            </button>

            {/* Save button */}
            <button
              type="button"
              onClick={handleSave}
              className="w-full text-white inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UseCaseModal;
