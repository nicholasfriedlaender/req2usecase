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
    const responseText = await response.text();
    let data;
    try {
      data = responseText;
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      throw new Error("Server response is not valid JSON");
    }
    return responseText;
  } catch (error) {
    console.error("Error:", error);
    return json({ message: "Error occurred" }, { status: 500 });
  }
};
