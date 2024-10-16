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

const description2 = {
    actors: "Students",
    summary: "Create and simulate a traffic map",
    description:
      "The student creates a visual map of an area, describes the behavior of traffic lights at each intersection, designs sensors for intersections, simulates traffic flow, and changes traffic density.",
    steps: [
      "1. The student creates a visual map of an area with roads and intersections.",
      "2. The student describes the behavior of traffic lights at each intersection, including timing schemes and sequences.",
      "3. The student designs sensors for intersections to detect cars in lanes and change light behavior accordingly.",
      "4. The student simulates traffic flow on the map, visualizing traffic levels and intersection states in real-time.",
      "5. The student changes the traffic density entering the map on a given road.",
    ],
  };
export default function Index() {
  return (
    <div className="flex flex-col h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
      <div className="flex justify-center mt-10">
        <Heading />
      </div>
      <div className="flex flex-grow items-center justify-center">
        <ModelStep useCaseDescription={description2}/>
        <ProgressBar progress="100%" step={4} />
      </div>
    </div>
  );
}