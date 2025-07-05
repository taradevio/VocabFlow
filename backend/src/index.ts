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

app.post("/api/openrouter", async (c) => {
  const { API_KEY } = env<{ API_KEY: string }>(c);
  const body = await c.req.json();

  c.header("Content-Type", "text/event-stream");
  c.header("Cache-Control", "no-cache");
  c.header("Connection", "keep-alive");
  c.header("Access-Control-Allow-Origin", "*");
  c.header("Access-Control-Allow-Headers", "Content-Type");

  return stream(
    c,
    async (streamWriter) => {
      await fetchOpenRouter(body.message, API_KEY, (chunk) => {
        streamWriter.write(
          `data: ${JSON.stringify({
            choices: [{ delta: { content: chunk } }],
          })}\n\n`
        );
      });
      streamWriter.write("data: [DONE]\n\n");
    },
  );
});

export default app;
