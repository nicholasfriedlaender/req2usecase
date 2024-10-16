import { ActionFunction, json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // This will retunr the PlantUML and Description
    const response = {
    // Be we filled
    };

    return json({ response: response });
  } catch (error) {
    console.error("Error:", error);
    return json({ message: "Error occurred" }, { status: 500 });
  }
};
