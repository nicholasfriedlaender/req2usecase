import React, { useState } from "react";
import Alert from "./Alert";

function Card({ chips, setActors, nextStep }: any) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newActor, setNewActor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddActor = () => {
    if (newActor.trim()) {
      setActors((prevActors: any) => [...prevActors, newActor]);
      setNewActor("");
      setIsPopupOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/actionTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requirements: "Test" }),
      });

      const data = await response.json();
      console.log("Actors: ", data.response.names);
      setActors(data.response.names);
      nextStep();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-3/5">
      <label
        htmlFor="message"
        className="block text-xl font-medium text-gray-900 dark:text-white"
      >
        Identified Actors
      </label>
      <div
        className={`p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 min-h-[24rem] flex flex-col justify-between relative`}
      >
        <div className="flex flex-wrap gap-4 mb-4">{chips}</div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            disabled={loading}
            className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Add Actor
          </button>
        </div>

        {loading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <div className="bg-gray-100 bg-opacity-50 absolute inset-0" />
            <Alert message="actors" />
          </div>
        )}
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

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New Actor</h2>
            <input
              type="text"
              value={newActor}
              onChange={(e) => setNewActor(e.target.value)}
              className="border rounded-lg w-full p-2 mb-4"
              placeholder="Enter actor name"
              disabled={loading} 
            />
            <div className="flex justify-end">
              <button
                onClick={handleAddActor}
                className="text-white bg-blue-500 rounded-lg px-4 py-2 mr-2"
                disabled={loading} 
              >
                Add
              </button>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="text-gray-900 bg-gray-200 rounded-lg px-4 py-2"
                disabled={loading} 
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
