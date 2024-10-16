import type { MetaFunction } from "@remix-run/node";
import Heading from "~/Components/Elements/Heading";
import ModelStep from "~/Components/Steps/ModelStep";
import ProgressBar from "~/Components/Elements/ProgressBar";

export const meta: MetaFunction = () => {
  return [
    { title: "UseCase Assistant" },
    { name: "description", content: "Use Case Assistant" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
      <div className="flex justify-center mt-10">
        <Heading />
      </div>
      <div className="flex flex-grow items-center justify-center">
        <ModelStep />
        <ProgressBar progress="100%" step={4} />
      </div>
    </div>
  );
}
