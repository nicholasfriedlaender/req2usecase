import React, { useState } from "react";

function UseCaseModal({ setIsPopupOpen, value }: any) {
      const [tempDescription, setTemDescription] = useState(value);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setTemDescription(e.target.value);
        };


  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 flex items-center bg-black bg-opacity-50 justify-center z-40"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Edit UseCase
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
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  UseCase Description
                </label>
                <input
                  value={tempDescription}
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Use Case Description"
                  required
                />
              </div>
            </div>
            <button
              onClick={() => {setIsPopupOpen(false)}}
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m11 4-.5-1-.5 1-1 .125.834.708L9.5 6l1-.666 1 .666-.334-1.167.834-.708zm8.334 10.666L18.5 13l-.834 1.666-1.666.209 1.389 1.181L16.834 18l1.666-1.111L20.166 18l-.555-1.944L21 14.875zM6.667 6.333 6 5l-.667 1.333L4 6.5l1.111.944L4.667 9 6 8.111 7.333 9l-.444-1.556L8 6.5zM3.414 17c0 .534.208 1.036.586 1.414L5.586 20c.378.378.88.586 1.414.586s1.036-.208 1.414-.586L20 8.414c.378-.378.586-.88.586-1.414S20.378 5.964 20 5.586L18.414 4c-.756-.756-2.072-.756-2.828 0L4 15.586c-.378.378-.586.88-.586 1.414zM17 5.414 18.586 7 15 10.586 13.414 9 17 5.414z" />{" "}
              </svg>
              Edit UseCase
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UseCaseModal;
