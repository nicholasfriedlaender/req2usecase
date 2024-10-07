import { useCallback, useState } from "react";
import Chip from "./Chip";
import ProgressBar from "./ProgressBar";
import Card from "./Card";
import Textarea from "./RequirementsInput";

function MultiStep() {
  const [step, setStep] = useState(1);
  const [actors, setActors] = useState([""]);

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
          <Textarea nextStep={nextStep} setActors={setActors} />
          <ProgressBar progress="25%" step={step} />
        </>
      )}
      {step === 2 && (
        <>
          <Card chips={chipsMark} setActors={setActors} nextStep={nextStep} />
          <ProgressBar progress="50%" step={step} />
        </>
      )}
      {step === 3 && (
        <>
          <Textarea nextStep={nextStep} setActors={setActors} />
          <ProgressBar progress="75%" step={step} />
        </>
      )}
      {step === 4 && (
        <>
          <Textarea nextStep={nextStep} setActors={setActors} />
          <ProgressBar progress="100%" step={step} />
        </>
      )}
    </>
  );
}

export default MultiStep;
