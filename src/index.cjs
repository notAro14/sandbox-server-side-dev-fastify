const fastify = require("fastify");
const serverOptions = {
  logger: true,
};

async function main() {
  const app = fastify(serverOptions);
  await app.listen({
    port: 8080,
    host: "0.0.0.0",
  });

  app.log.debug(app.initialConfig, "Fastify listening with the config");
  const port = app.server.address().port;
  app.log.info("HTTP Server port is %i", port);
}

main();
