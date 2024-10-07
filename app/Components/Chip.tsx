import React, { useState } from "react";

function Chip({
  actorName,
  removeActor,
  onEdit,
}: {
  actorName: string;
  removeActor: () => void;
  onEdit: (newName: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(actorName);

  const handleEdit = () => {
    setIsEditing(true);
    setTempName(actorName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onEdit(tempName);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditing(false);
      onEdit(tempName);
    }
  };

  return (
    <div>
      <span className="inline-flex items-center px-4 py-2 me-3 text-medium font-medium text-gray-800 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
        {isEditing ? (
          <input
            type="text"
            value={tempName}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            className="bg-transparent border-none text-gray-800 dark:text-gray-300 focus:outline-none"
            autoFocus
          />
        ) : (
          <span onClick={handleEdit} className="cursor-pointer">
            {actorName}
          </span>
        )}
        <button
          type="button"
          onClick={removeActor}
          className="inline-flex items-center p-2 ms-3 text-medium text-gray-400 bg-transparent rounded-sm hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-gray-300"
          aria-label="Remove"
        >
          <svg
            className="w-4 h-4"
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
          <span className="sr-only">Remove actor</span>
        </button>
      </span>
    </div>
  );
}

export default Chip;
