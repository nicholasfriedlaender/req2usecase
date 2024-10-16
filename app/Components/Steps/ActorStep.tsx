import React, { useState } from "react";
import Alert from "../Elements/Alert";
import ActorModal from "../Elements/ActorModal";
import { useNavigate } from "@remix-run/react";

function ActorStep({ chips, actors, setActors, nextStep, setUseCase, requirements }: any) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newActor, setNewActor] = useState("");
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
      const response = await fetch("/api/UseCase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requirements: requirements, actors: actors }),
      });
      const data = await response.json();
      setUseCase(data.response.useCases);
      nextStep();
    } catch (error) {
      console.error("Error:", error);
      navigate("/something-went-wrong");
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
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-100 hover:text-blue-700"
            }`}
          >
            Add Actor
          </button>
        </div>

        {loading && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            <div className="bg-gray-100 bg-opacity-50 blur-xl absolute inset-0" />
            <Alert message="actors" />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 hover:text-blue-700"
          } rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
        >
          {loading ? "Processing..." : "Next Step"}
        </button>
      </div>

      {/* Add Actor Modal */}
      {isPopupOpen && (
        <ActorModal
          setNewActor={setNewActor}
          handleAddActor={handleAddActor}
          setIsPopupOpen={setIsPopupOpen}
        />
      )}
    </div>
  );
}

export default ActorStep;
