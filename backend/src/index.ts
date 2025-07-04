import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "hono/adapter";
import { fetchOpenRouter } from "./services/openrouter";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/openrouter", async (c) => {
  const { API_KEY } = env<{ API_KEY: string }>(c);
  const body = await c.req.json();

  const result = await fetchOpenRouter(body.message, API_KEY);
  return c.json(result);
});

export default app;
