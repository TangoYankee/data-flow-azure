import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { $ } from "execa";

export async function download(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  console.log("hit download endpoint");
  const { stdout } = await $("src/scripts/install-check.sh");
  console.log('stdout', stdout);

  const name = request.query.get('name') || await request.text() || 'world';
  return { body: `Hello there, ${name}` };
};

app.http('download', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: download
});
