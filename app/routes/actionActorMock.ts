import { ActionFunction, json } from "@remix-run/node";


export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Request body:", body);
    // Return identiefied actors
    const response = {
      names: [
        "Customer",
        "Sales Representative",
        "Administrator",
        "Developer",
        "Manager",
        "Support Staff",
        "External System",
      ],
    };

    return json({ response: response});
  } catch (error) {
    console.error("Error:", error);
    return json({ message: "Error occurred" }, { status: 500 });
  }
};
