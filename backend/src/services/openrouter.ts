// in js, there's no need to use type just like below
type chatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
}

type ChatAPIResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: chatMessage;
    finish_reason: string;
  }[];
};

export const fetchOpenRouter = async (
  // in js, we just need to pass two params: message and api key without any type annotations as well as promise as shown below
  messages: chatMessage[], 
  apiKey: string
): Promise<ChatAPIResponse> => {

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-32b:free",
          messages,
        //   messages: [
        //     {
        //       role: "user",
        //       content: "What is absolute possessive and what are the examples?",
        //     },
        //   ],
        }),
      }
    );

    if(!response.ok) {
      const errorText = await response.text();
      console.error("Failed fetching API Router:", errorText);
      throw new Error("Failed to fetch API response")
    }

    // in js, we can just return the response without adding *as CHATAPIRESPONSE*
    const req = await response.json() as ChatAPIResponse
    return req;
  } catch (error) {
    console.error("failed to fetch api", error);
    throw error
  }
};