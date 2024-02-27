const fastify = require("fastify");
const serverOptions = {
  logger: true,
};

class Workout {
  constructor(title) {
    this.title = title;
  }

  toJSON() {
    return {
      title: this.title,
    };
  }
}

async function main() {
  const app = fastify(serverOptions);
  app.get("/", async () => {
    return new Workout("My Workout");
  });

  await app.listen({
    port: 8080,
    host: "0.0.0.0",
  });

  const port = app.server.address().port;
  app.log.info("HTTP Server port is %i", port);
}

main();
