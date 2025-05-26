import { oak, oakCors } from "@deps";
import { Env } from "@utils";
import { router } from "@router";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const { Application } = oak;

  const app = new Application();
  const { PORT, HOST, DOMAIN_AUTHORIZED } = await Env.init();

  // app.use(
  //   oakCors({
  //     origin: new RegExp(DOMAIN_AUTHORIZED),
  //     optionsSuccessStatus: 200,
  //   }),
  // );
  app.use(router.routes());
  app.use(router.allowedMethods());

  app.listen({ port: +PORT, hostname: HOST });
  app.addEventListener("listen", ({ hostname, port, secure }) => {
    console.log(`
    +++++++++++++++++++++++++++++++++++++++++
    Server listening on ${secure ? "https" : "http"}://${hostname}:${port}
    +++++++++++++++++++++++++++++++++++++++++
    `);
  });
}
