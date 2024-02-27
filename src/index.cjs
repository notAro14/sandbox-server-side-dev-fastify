const fastify = require("fastify");
const serverOptions = {
  logger: true,
};

async function main() {
  const app = fastify(serverOptions);
  app.get("/", async () => {
    return { hello: "world" };
  });

  await app.listen({
    port: 8080,
    host: "0.0.0.0",
  });

  const port = app.server.address().port;
  app.log.info("HTTP Server port is %i", port);
}

main();
