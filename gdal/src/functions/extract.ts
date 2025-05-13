import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { $ } from "execa";

export async function extract(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const { stdout } = await $("src/scripts/version-check.sh");
  console.log('stdout', stdout);

  const name = request.query.get('name') || await request.text() || 'world';
  return { body: `Hello there, ${name}` };
};

app.http('extract', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: extract
});
