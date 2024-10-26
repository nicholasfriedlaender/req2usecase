import { useCallback, useState } from "react";
import Chip from "./Elements/Chip";
import ProgressBar from "./Elements/ProgressBar";
import ReqStep from "./Steps/ReqStep";
import ActorStep from "./Steps/ActorStep";
import UseCaseStep from "./Steps/UseCaseStep";
import ModelStep from "./Steps/ModelStep";

// TODO: Use the react cache component here

function MultiStep() {
  const [step, setStep] = useState(1);
  const [actors, setActors] = useState([""]);
  const [useCase, setUseCase] = useState([]);
  const [requirements, setRequirements] = useState("");
  // TODO: Remove standard URL
  const [modelURL, setModelURL] = useState(
    "https://www.plantuml.com/plantuml/png/VOmn3i9030JxUyMMfCW7ha390wY0BeqXbcB9vqHdf-3tv0HrkjtHxWmUL6ClcfxE5VqLbtiZtRytS2J4mg1jKtbJo6eTCaPu8LKelLXJoZSImpWNiOp-xFXOn24-sOS3PEingPFzD0FRl1Vz0W00"
  );
  const [plantUML, setPlantUML] = useState("");
  const [useCaseDescriptions, setUseCaseDescriptions] = useState();

  const removeActor = useCallback(
    (tag: string) => () => {
      setActors((previousTags) =>
        previousTags.filter((previousTag) => previousTag !== tag)
      );
    },
    []
  );

  const editActor = useCallback((oldName: string, newName: string) => {
    setActors((previousTags) =>
      previousTags.map((tag) => (tag === oldName ? newName : tag))
    );
  }, []);

  const chipsMark = actors.map((actor) => (
    <Chip
      actorName={actor}
      removeActor={removeActor(actor)}
      key={actor}
      onEdit={(newName: string) => editActor(actor, newName)}
    />
  ));

  const nextStep = () => {
    setStep((s) => s + 1);
  };

  return (
    <>
      {step === 1 && (
        <>
          <ReqStep
            nextStep={nextStep}
            setActors={setActors}
            requirements={requirements}
            setRequirements={setRequirements}
          />
          <ProgressBar progress="25%" step={step} />
        </>
      )}
      {step === 2 && (
        <>
          <ActorStep
            chips={chipsMark}
            actors={actors}
            setActors={setActors}
            nextStep={nextStep}
            setUseCase={setUseCase}
            requirements={requirements}
          />
          <ProgressBar progress="50%" step={step} />
        </>
      )}
      {step === 3 && (
        <>
          <UseCaseStep
            nextStep={nextStep}
            useCase={useCase}
            setUseCase={setUseCase}
            requirements={requirements}
            setModelURL={setModelURL}
            setUseCaseDescription={setUseCaseDescriptions}
            setPlantUML={setPlantUML}
          />
          <ProgressBar progress="75%" step={step} />
        </>
      )}
      {step === 4 && (
        <>
          <ModelStep
            modelURL={modelURL}
            useCaseDescription={useCaseDescriptions}
            plantUML={plantUML}
            setModelURL={setModelURL}
            setUseCaseDescription={setUseCaseDescriptions}
            setPlantUML={setPlantUML}
          />
          <ProgressBar progress="100%" step={step} />
        </>
      )}
    </>
  );
}

export default MultiStep;
