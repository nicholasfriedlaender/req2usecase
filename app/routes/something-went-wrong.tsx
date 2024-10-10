import type { MetaFunction } from "@remix-run/node";
import Heading from "~/Components/Elements/Heading";
import AlertError from "~/Components/Elements/AlertError";
import ProgressBarError from "~/Components/Elements/ProgressBarError";

export const meta: MetaFunction = () => {
  return [
    { title: "Something went wrong" },
    { name: "description", content: "Use Case Assistant" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
      <div className="flex justify-center mt-20">
        <Heading />
      </div>
      <div className="flex flex-grow items-center justify-center">
        <AlertError />
      </div>
      <ProgressBarError />
    </div>
  );
}
