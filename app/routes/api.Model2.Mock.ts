import { ActionFunction, json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  // TODO make the LLM respond in this form
  const response = {
    modelURL:
      "https://www.plantuml.com/plantuml/png/VOmn3i9030JxUyMMfCW7ha390wY0BeqXbcB9vqHdf-3tv0HrkjtHxWmUL6ClcfxE5VqLbtiZtRytS2J4mg1jKtbJo6eTCaPu8LKelLXJoZSImpWNiOp-xFXOn24-sOS3PEingPFzD0FRl1Vz0W00",
    jsonUseCaseDescriptions: [
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
    ],
  };
  return response;
};
