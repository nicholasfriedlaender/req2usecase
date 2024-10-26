import type { MetaFunction } from "@remix-run/node";
import MultiStep from "~/Components/MultiStep";
import Heading from "~/Components/Elements/Heading";
import { useState } from "react";
import ModelStep from "~/Components/Steps/ModelStep";
import ProgressBar from "~/Components/Elements/ProgressBar";

export const meta: MetaFunction = () => {
  return [
    { title: "UseCase Assistant" },
    { name: "description", content: "UseCase Assistant" },
  ];
};

export default function Index() {
  const [step, setStep] = useState(1);
  const [actors, setActors] = useState([""]);
  const [useCase, setUseCase] = useState([]);
  const [requirements, setRequirements] = useState("");
  // TODO: Remove standard URL
  const [modelURL, setModelURL] = useState(
    "https://www.plantuml.com/plantuml/png/VOmn3i9030JxUyMMfCW7ha390wY0BeqXbcB9vqHdf-3tv0HrkjtHxWmUL6ClcfxE5VqLbtiZtRytS2J4mg1jKtbJo6eTCaPu8LKelLXJoZSImpWNiOp-xFXOn24-sOS3PEingPFzD0FRl1Vz0W00"
  );
  const [plantUML, setPlantUML] = useState("");
  const [useCaseDescriptions, setUseCaseDescriptions] = useState([
    {
      title: "verbNoun1",
      description: "Description of the first use case.",
      actors: ["Actor1", "Actor2"],
      preconditions: ["Precondition1", "Precondition2"],
      postconditions: ["Postcondition1", "Postcondition2"],
    },
    {
      title: "verbNoun2",
      description: "Description of the second use case.",
      actors: ["Actor1", "Actor2"],
      preconditions: ["Precondition1", "Precondition2"],
      postconditions: ["Postcondition1", "Postcondition2"],
    },
    {
      title: "verbNoun3",
      description: "Description of the third use case.",
      actors: ["Actor1", "Actor2"],
      preconditions: ["Precondition1", "Precondition2"],
      postconditions: ["Postcondition1", "Postcondition2"],
    },
    {
      title: "verbNoun4",
      description: "Description of the fourth use case.",
      actors: ["Actor1", "Actor2"],
      preconditions: ["Precondition1", "Precondition2"],
      postconditions: ["Postcondition1", "Postcondition2"],
    },
    {
      title: "verbNoun5",
      description: "Description of the fifth use case.",
      actors: ["Actor1", "Actor2"],
      preconditions: ["Precondition1", "Precondition2"],
      postconditions: ["Postcondition1", "Postcondition2"],
    },
  ]);

  return (
    <div className="flex flex-col h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
      <div className="flex justify-center mt-10">
        <Heading />
      </div>
      <div className="flex flex-grow items-center justify-center">
        <ModelStep
          modelURL={modelURL}
          useCaseDescriptions={useCaseDescriptions}
          plantUML={plantUML}
          setModelURL={setModelURL}
          setUseCaseDescription={setUseCaseDescriptions}
          setPlantUML={setPlantUML}
        />
        <ProgressBar progress="100%" step={step} />
      </div>
    </div>
  );
}
