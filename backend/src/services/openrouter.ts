// in js, there's no need to use type just like below
type chatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

// type ChatAPIResponse = {
//   id: string;
//   object: string;
//   created: number;
//   model: string;
//   choices: {
//     index: number;
//     message: chatMessage;
//     finish_reason: string;
//   }[];
// };

export const fetchOpenRouter = async (
  // in js, we just need to pass two params: message and api key without any type annotations as well as promise as shown below
  messages: chatMessage[],
  apiKey: string,
  onChunk: (text: string) => void
  // there is no need to use Promise:<ChatAPIResponse since this file will only act as a relay. The OpenRouter API will be forwarded through Hono stream>. Even so, no deletion since async basically returns a promise and this below is just how typescript is written
): Promise<void> => {

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "moonshotai/kimi-k2:free",
        messages,
        stream: true,
      }),
    }
  );

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Response body is not readable");
  }

  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      // Append new chunk to buffer
      buffer += decoder.decode(value, { stream: true });
      // Process complete lines from buffer
      while (true) {
        const lineEnd = buffer.indexOf("\n");
        if (lineEnd === -1) break;
        const line = buffer.slice(0, lineEnd).trim();
        buffer = buffer.slice(lineEnd + 1);
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0].delta.content;
            if (content) {
              onChunk(content);
            }
          } catch (e) {
            console.warn("failed to parse chunk", e)
          }
        }
      }
    }
  } finally {
    reader.cancel();
  }

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   console.error("Failed fetching API Router:", errorText);
  //   throw new Error("Failed to fetch API response");
  // }

  // in js, we can just return the response without adding *as CHATAPIRESPONSE*
  // const req = (await response.json()) as ChatAPIResponse;
  // return req;
};