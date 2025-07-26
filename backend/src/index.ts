import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "hono/adapter";
import { stream } from "hono/streaming";
import { fetchOpenRouter } from "./services/openrouter";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
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

app.post("/api/openrouter", async (c) => {
  const { API_KEY } = env<{ API_KEY: string }>(c);
  const body = await c.req.json();

  c.header("Content-Type", "text/event-stream");
  c.header("Cache-Control", "no-cache");
  c.header("Connection", "keep-alive");
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Headers", "Content-Type");

  return stream(c, async (streamWriter) => {
    try {
      await fetchOpenRouter(body.messages, API_KEY, (chunk) => {
        streamWriter.write(
          `data: ${JSON.stringify({
            choices: [{ delta: { content: chunk } }],
          })}\n\n`
        );
      });
      streamWriter.write("data: [DONE]\n\n");
    } catch (error) {
      console.error("stream error", error);
      streamWriter.write("event: error\ndata: Internal error\n\n");
      streamWriter.write("data: [DONE]\n\n");
    }
  });
});

export default app;
