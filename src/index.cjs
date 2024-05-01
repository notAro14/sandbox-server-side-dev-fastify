const fastify = require("fastify");
const closeWithGrace = require("close-with-grace");
const { Workout } = require("./workout.cjs");
const serverOptions = {
  logger: { level: "info" },
};
if (process.stdout.isTTY)
  serverOptions.logger.transport = { target: "pino-pretty" };

async function main() {
  const app = fastify(serverOptions);

  app.route({
    url: "/",
    method: "GET",
    handler: async (req, reply) => {
      reply.log.info("handler log");
      app.log.info("app log");
      return new Workout("My Workout");
    },
  });
  const cats = [];
  app.post("/cat", function saveCat(req, reply) {
    cats.push(req.body);
    reply.code(201).send({ allCats: cats });
  });
  app.get("/cat/:catName", function readCat(req, reply) {
    const lookingFor = req.params.catName;
    const result = cats.find((cat) => cat.name === lookingFor);
    if (result) return { cat: result };

    reply.code(404);
    throw new Error(`cat ${lookingFor} not found`);
  });

  await app.listen({
    port: 8080,
    host: "0.0.0.0",
  });

  const port = app.server.address().port;
  app.log.info("HTTP Server port is %i", port);

  closeWithGrace(async ({ signal, err }) => {
    if (err) {
      app.log.error({ err }, "server closing due to error");
    } else {
      app.log.info(`${signal} received, server closing`);
    }
    await app.close();
  });

  // ---- OR ----
  // function closeApplication() {
  //   app.close(function closeComplete(err) {
  //     if (err) {
  //       app.log.error(err, "error turning off");
  //     } else {
  //       app.log.info("bye bye");
  //     }
  //   });
  // }
  // process.on("SIGINT");
  // process.on("SIGTERM", closeApplication);
}

main();
