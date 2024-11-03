import { ActionFunction, json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();
    const { message, plantUML, useCaseDescriptions} = body;

    const response = await fetch("http://127.0.0.1:5000/llama/refine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, plantUML, useCaseDescriptions }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error("Error:", error);
    return json({ message: "Error occurred" }, { status: 500 });
  }
};
