import { ActionFunction, json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Request body:", body);
    // Return UseCases
    const response = [
      {
        actor: "Test0",
        useCases: ["Can change layout", "Manage users", "Access dashboard"],
      },
      {
        actor: "Test1",
        useCases: ["Can change layout", "Manage users", "Access dashboard"],
      },
      {
        actor: "Test2",
        useCases: [
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
          "Manage users",
        ],
      },
    ];

    return json({ response: response });
  } catch (error) {
    console.error("Error:", error);
    return json({ message: "Error occurred" }, { status: 500 });
  }
};
