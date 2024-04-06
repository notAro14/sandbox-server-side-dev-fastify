const fastify = require("fastify");
const { Workout } = require("./workout.cjs");
const serverOptions = {
  logger:
    process.env.NODE_ENV === "development"
      ? {
          level: "debug",
          transport: {
            target: "pino-pretty",
          },
        }
      : true,
};

async function main() {
  const app = fastify(serverOptions);
  app.get("/", async () => {
    return new Workout("My Workout");
  });

  await app.listen({
    port: 0,
    host: "0.0.0.0",
  });

  const port = app.server.address().port;
  app.log.info("HTTP Server port is %i", port);
  // app.log.debug(app.initialConfig, "Server config");
}

main();
