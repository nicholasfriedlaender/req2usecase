import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Elements/Alert";

function ReqStep({ nextStep, setActors }: any) {
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRequirements(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/Actor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requirements: requirements }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setActors(data.response.actors);
      nextStep();
    } catch (error) {
      console.error("Error:", error);
      navigate("/something-went-wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col gap-4 w-3/5">
      {loading && <Alert message="requirements" />}

      <label
        htmlFor="message"
        className="block text-xl font-medium text-gray-900 dark:text-white"
      >
        Software Requirements
      </label>
      <textarea
        id="message"
        rows={15}
        value={requirements}
        className={`block p-2.5 w-full text-base ${
          loading ? "text-gray-300" : "text-gray-900"
        } bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-700 focus:border-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-y-auto max-h-[480px] resize-none`}
        placeholder="Enter your requirements here..."
        onChange={handleChange}
      ></textarea>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!requirements || loading}
          className={`py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none ${
            !requirements || loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-gray-100 hover:text-blue-700"
          } rounded-lg border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`}
        >
          {loading ? "Processing..." : "Next Step"}
        </button>
      </div>
    </div>
  );
}

export default ReqStep;
