const Fastify = require("fastify");
const closeWithGrace = require("close-with-grace");

const serverOptions = {
  logger: { level: "info" },
};
if (process.stdout.isTTY)
  serverOptions.logger.transport = { target: "pino-pretty" };

const app = Fastify(serverOptions);
app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.listen({ port: 8080, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }

  app.log.info(`server listening on ${address}`);
});

closeWithGrace(async ({ signal, err }) => {
  if (err) {
    app.log.error({ err }, "server closing due to error");
  } else {
    app.log.info(`${signal} received, server closing`);
  }
  await app.close();
});
