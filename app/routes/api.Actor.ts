import { ActionFunction, json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();
    console.log("Request body:", body);
    const { requirements } = body;

    const response = await fetch("http://127.0.0.1:5000/llama/actors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ requirements }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText); 
    } catch (parseError) {
      console.error("Failed to parse JSON:", parseError);
      throw new Error("Server response is not valid JSON");
    }
    return json({ response: data });
  } catch (error) {
    console.error("Error:", error);
    return json({ message: "Error occurred" }, { status: 500 });
   
  }
};
