import { ActionFunction, json } from "@remix-run/node";


export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();
    await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log("Request body:", body);
    const { requirements } = body;
    const response = {
      names: [
        "Admin",
        "Cole",
        "Neel",
        "Software Engineer",
        "Lorem Ipsum",
        "Das ist ein Test",
      ],
    };

  
    return json({ response: response});
  } catch (error) {
    console.error("Error:", error);
    return json({ message: "Error occurred" }, { status: 500 });
  }
};
