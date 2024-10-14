import React from 'react'

function Chat() {
    // TODO: give the form action url
  return (
    <form className="w-8/12">
      <div className="mb-5">
        <label
          htmlFor="chat"
          className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
        >
          Refine Model
        </label>
        <input
          type="text"
          id="chat"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Refinement Instructions"
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Improve
      </button>
    </form>
  );
}

export default Chat