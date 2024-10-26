import { useState } from "react";

function Accordion({ useCaseDescriptions }: any) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <div id="accordion-collapse" data-accordion="open">
      <div>
        <h2 id="accordion-collapse-heading-actor">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium text-gray-700 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            onClick={() => toggleAccordion(0)}
            aria-expanded={openIndices.includes(0)}
            aria-controls="accordion-collapse-body-actor"
          >
            <span>Actors</span>
            <svg
              className={`w-3 h-3 ${
                openIndices.includes(0) ? "rotate-180" : ""
              } shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-actor"
          className={openIndices.includes(0) ? "" : "hidden"}
          aria-labelledby="accordion-collapse-heading-actor"
        >
          <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {useCaseDescriptions.actors.join(", ")}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 id="accordion-collapse-heading-description">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium text-gray-700 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
            onClick={() => toggleAccordion(1)}
            aria-expanded={openIndices.includes(1)}
            aria-controls="accordion-collapse-body-description"
          >
            <span>Description</span>
            <svg
              className={`w-3 h-3 ${
                openIndices.includes(1) ? "rotate-180" : ""
              } shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5 5 1 1 5"
              />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-description"
          className={openIndices.includes(1) ? "" : "hidden"}
          aria-labelledby="accordion-collapse-heading-description"
        >
          <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              {useCaseDescriptions.description}
            </p>
          </div>
        </div>
      </div>

      {/* Continue for the other fields */}
    </div>
  );
}

export default Accordion;
