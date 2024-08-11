import app from "./app";

Bun.serve({
  port: 3000 || process.env.PORT,
  fetch: app.fetch,
});
console.log(`Server is running`);
