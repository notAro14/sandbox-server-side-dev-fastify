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

  app.addHook("onReady", function preLoading(done) {
    app.log.info("onReady");
    done();
  });
  app.addHook("onRoute", async () => {
    app.log.info("onRoute");
  });
  app.addHook("preSerialization", async () => {
    app.log.info("preSerialization");
  });
  app.addHook("onResponse", async () => {
    app.log.info("onResponse");
  });
  app.route({
    url: "/",
    method: "GET",
    handler: async () => {
      return new Workout("My Workout");
    },
  });
  app.addHook("onSend", async () => {
    app.log.info("onSend");
  });

  await app.listen({
    port: 8080,
    host: "0.0.0.0",
  });

  const port = app.server.address().port;
  app.log.info("HTTP Server port is %i", port);
  // app.log.debug(app.initialConfig, "Server config");
}

main();
