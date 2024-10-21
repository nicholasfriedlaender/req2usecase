import { useState } from "react";
import { useNavigate } from "@remix-run/react";

function Chat({
  plantUML,
  useCaseDescription,
  setModelURL,
  setUseCaseDescription,
  setPlantUML,
  setIsLoading,
}: any) {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendMessage = async () => {
    setIsLoading(true);
    if (!message.trim()) return;
    try {
      const response = await fetch("/api/Refine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, plantUML, useCaseDescription }),
      });

      const llmAnswer = await response.json();
      setModelURL(llmAnswer.model_url);
      setUseCaseDescription(llmAnswer.json_object);
      setPlantUML(llmAnswer.plantUML);
    } catch (error) {
      console.error("Error:", error);
      navigate("/something-went-wrong");
    } finally {
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <div>
      <label
        htmlFor="message"
        className="block mb-2 text-lg font-semibold text-gray-900 dark:text-white"
      >
        Refine UseCase
      </label>
      <div className="flex items-center space-x-4">
        <textarea
          id="chat"
          rows={2}
          className="max-h-80 min-h-16 block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-700 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          type="button"
          onClick={handleSendMessage}
          className="inline-flex justify-center p-2 text-blue-700 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-700 dark:hover:bg-gray-600"
        >
          <svg
            className="w-5 h-5 rotate-90 rtl:-rotate-90"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 20"
          >
            <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
          </svg>
          <span className="sr-only">Send message</span>
        </button>
      </div>
    </div>
  );
}

export default Chat;
