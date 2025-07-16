import { Hono } from "hono";
import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import Google from "@auth/core/providers/google";

const app = new Hono();

app.use(
  "*",
  initAuthConfig((c) => ({
    secret: c.env.AUTH_SECRET,
    providers: [
      Google({
        clientId: c.env.AUTH_GOOGLE_ID,
        clientSecret: c.env.AUTH_GOOGLE_SECRET,
      }),
    ],
  }))
);

app.use("/api/auth/*", authHandler());
app.use("/api/*", verifyAuth());
app.get("/api/protected", (c) => {
  const auth = c.get("authUser");
  return c.json(auth);
});