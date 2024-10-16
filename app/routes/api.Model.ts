import { ActionFunction, json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();
    const { requirements, relationships } = body;

    const response = await fetch("http://127.0.0.1:5000/llama/model", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requirements, relationships }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    try {
      console.log("LLM Response:", JSON.stringify(response))
      
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      throw new Error("Server response is not valid JSON");
    }
    return response;
  } catch (error) {
    console.error("Error:", error);
    return json({ message: "Error occurred" }, { status: 500 });
  }
};
