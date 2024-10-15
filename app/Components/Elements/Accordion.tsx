import { useState } from "react";

const Accordion = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleAccordion = (index: number) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  const accordionData = [
    {
      title: "Actor/s",
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is an open-source library of interactive components built
            on top of Tailwind CSS including buttons, dropdowns, modals,
            navbars, and more.
          </p>
        </>
      ),
    },
    {
      title: "Summary",
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            Flowbite is first conceptualized and designed using the Figma
            software, so everything you see in the library has a design
            equivalent in our Figma file.
          </p>
        </>
      ),
    },
    {
      title: "Description",
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            The main difference is that the core components from Flowbite are
            open source under the MIT license, whereas Tailwind UI is a paid
            product. Another difference is that Flowbite relies on smaller and
            standalone components, whereas Tailwind UI offers sections of pages.
          </p>
        </>
      ),
    },
    {
      title: "Steps",
      content: (
        <>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            The main difference is that the core components from Flowbite are
            open source under the MIT license, whereas Tailwind UI is a paid
            product. Another difference is that Flowbite relies on smaller and
            standalone components, whereas Tailwind UI offers sections of pages.
          </p>
        </>
      ),
    },
  ];

  return (
    <div id="accordion-collapse" data-accordion="open">
      {accordionData.map((item, index) => (
        <div key={index}>
          <h2 id={`accordion-collapse-heading-${index}`}>
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium text-gray-500 border border-b-0 border-gray-200 ${
                index === 0 ? "rounded-t-xl" : ""
              } focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndices.includes(index)}
              aria-controls={`accordion-collapse-body-${index}`}
            >
              <span>{item.title}</span>
              <svg
                className={`w-3 h-3 ${
                  openIndices.includes(index) ? "rotate-180" : ""
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
            id={`accordion-collapse-body-${index}`}
            className={openIndices.includes(index) ? "" : "hidden"}
            aria-labelledby={`accordion-collapse-heading-${index}`}
          >
            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
