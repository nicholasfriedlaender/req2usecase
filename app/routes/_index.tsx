import type { MetaFunction } from "@remix-run/node";
import Heading from "~/Components/Elements/Heading";
import StartButton from "~/Components/Elements/StartButton";

export const meta: MetaFunction = () => {
  return [
    { title: "Req2UseCase" },
    { name: "description", content: "UseCase Assistant" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
      <div className="flex justify-center mb-8">
        <Heading />
      </div>
      <div className="flex justify-center">
        <StartButton />
      </div>
    </div>
  );
}
