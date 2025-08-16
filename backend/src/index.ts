import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "hono/adapter";
import { stream } from "hono/streaming";
import { fetchGemini } from "./services/fetchGemini";

type Env = { GOOGLE_API_KEY: string };
const app = new Hono<{ Bindings: Env }>();

app.use("*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.options("/api/gemini", (c) => {
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type");
  return c.body("null, 204");
});

app.post("/api/gemini", async (c) => {
  const { GOOGLE_API_KEY } = c.env;
  const body = await c.req.json<{
    messages: { role: "user" | "assistant" | "system"; content: string }[];
  }>();

  c.header("Content-Type", "text/event-stream; charset=utf-8");
  c.header("Cache-Control", "no-cache");
  c.header("Connection", "keep-alive");
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return stream(c, async (writer) => {
    try {
      await fetchGemini(body.messages, GOOGLE_API_KEY, (chunk) => {
        writer.write(
          `data: ${JSON.stringify({
            choices: [{ delta: { content: chunk } }],
          })}\n\n`
        );
      });
      writer.write("data: [DONE]\n\n");
    } catch (error) {
      console.error("stream error", error);
      writer.write(`event: ${error}\ndata: Internal error\n\n`);
      writer.write("data: [DONE]\n\n");
    }
  });
});

// app.post("/api/test", async (c) => {
//   const { API_KEY } = env<{ API_KEY: string }>(c);
//   const body = await c.req.json();

//   c.header("Content-Type", "text/event-stream");
//   c.header("Cache-Control", "no-cache");
//   c.header("Connection", "keep-alive");
//   c.header("Access-Control-Allow-Origin", "*");
//   c.header("Access-Control-Allow-Headers", "Content-Type");

//   const chunks: string[] = [];

//   await new Promise<void>((resolve, reject) => {
//     fetchOpenRouter(body.messages, API_KEY, (chunk) => {
//       chunks.push(chunk);
//     })
//       .then(() => resolve())
//       .catch((err) => reject(err));
//   });

//   return c.json({ result: chunks.join("") });

// app.post("/api/openrouter", async (c) => {
//   const { API_KEY } = env<{ API_KEY: string }>(c);
//   const body = await c.req.json();

//   c.header("Content-Type", "text/event-stream");
//   c.header("Cache-Control", "no-cache");
//   c.header("Connection", "keep-alive");
//   c.header("Access-Control-Allow-Origin", "*");
//   c.header("Access-Control-Allow-Headers", "Content-Type");

//   return stream(c, async (streamWriter) => {
//     try {
//       await fetchOpenRouter(body.messages, API_KEY, (chunk) => {
//         streamWriter.write(
//           `data: ${JSON.stringify({
//             choices: [{ delta: { content: chunk } }],
//           })}\n\n`
//         );
//       });

//       streamWriter.write("data: [DONE]\n\n");
//     } catch (e) {
//       console.error("Stream error:", e);
//       streamWriter.write("data: [DONE]\n\n");
//     }
//   });

// app.post("/api/openrouter", async (c) => {
//   const { API_KEY } = env<{ API_KEY: string }>(c);
//   const body = await c.req.json();

//   c.header("Content-Type", "text/event-stream");
//   c.header("Cache-Control", "no-cache");
//   c.header("Connection", "keep-alive");
//   c.header("Access-Control-Allow-Origin", "*");
//   c.header("Access-Control-Allow-Headers", "Content-Type");

//   return stream(c, async (streamWriter) => {
//     try {
//       await fetchOpenRouter(body.messages, API_KEY, (chunk) => {
//         streamWriter.write(
//           `data: ${JSON.stringify({
//             choices: [{ delta: { content: chunk } }],
//           })}\n\n`
//         );
//       });
//       streamWriter.write("data: [DONE]\n\n");
//     } catch (error) {
//       console.error("stream error", error);
//       streamWriter.write("event: error\ndata: Internal error\n\n");
//       streamWriter.write("data: [DONE]\n\n");
//     }
//   });
// });

export default app;
